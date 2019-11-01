<template>
  <div class="product">
    <h2>产品管理</h2>
    <!-- 按钮 -->
    <div class="btns">
			<el-button @click="toAddHandler" type="primary" size="small">添加</el-button>
			<el-button type="danger" size="small" @click="batchDeleteHandler">批量删除</el-button>
		</div>
    <!-- 表单开始 -->
    <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
      <el-form :model="form" :rules="rules" ref="productForm">
        <el-form-item label="产品名称" label-width="80px" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="80px" prop="price">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="描述" label-width="80px" prop="description">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="栏目Id" label-width ="80px" prop="categoryId">
           <el-select v-model="form.categoryId" placeholder="选择栏目">
            <el-option v-for="item in categories" :label="item.name" :value="item.id" :key="item.id" autocomplete="off"></el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="上传图片" label-width="80px">
          <el-upload 
            class="upload-demo"
            action="http://134.175.154.93:6677/file/upload"
            :file-list="fileList"
            :on-success="uploadSuccessHandler"
            :on-remove="removeHandler"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal" size="small">取 消</el-button>
        <el-button type="primary" @click="submitHandler" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表单结束 -->
    <!-- 表格开始 -->
    <el-table :data="products.list" size="small" @selection-change="idsChangeHandler">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="产品名称"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="categoryId" label="栏目">
        <!-- <template v-slot:default="record">
          <img :src="record.row.icon">
        </template> -->
      </el-table-column>
      <el-table-column label="操作" width="100px" align="center">
        <template #default="record">
          <a href="" class="el-icon-delete" @click.prevent = "deleteHandler(record.row.id)"></a> &nbsp;
          <a href="" class="el-icon-edit-outline" @click.prevent = "editHandler(record.row)"></a> &nbsp;
          <a href=""  @click.prevent = "DetailHandler(record.row)">详情</a>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
			@current-change="pageChangeHandler"
	    layout="prev, pager, next"
	    :current-page="products.page+1"
	    :page-size="products.pageSize"
	    :total="products.total">
	  </el-pagination>
  
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
// import { Context } from 'tern';
export default {
  data() {
    return {
      fileList:[],
      form: {},
      ids:[],
      //表单验证规则
      rules:{
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
        ],
        num:[
          { required: true, message: '请输入数量', trigger: 'blur' }
        ]
      },
      params:{
      page:0,
      pageSize:5,
      },
    }
  },
  created(){
    this.findAllproducts(this.params)
  },
  computed: {
    ...mapState("category",["categories"]),
    ...mapState("product",["products","visible","title"]),  
  },
  methods: {
    //动作
    ...mapActions("product",["findAllproducts","deleteproductById","saveOrUpdateproduct","batchDeleteproducts"]),
    //突变
    ...mapMutations("product",["pageChangeHandler","showModal","closeModal","setTitle"]),
    //普通方法
    //1.删除方法
    //分页改变函数
    pageChangeHandler(currentPage){
      this.params.page = currentPage-1;
      this.findAllproducts(this.params)
    },
    uploadSuccessHandler(response){
      // 获取返回值ID
     if(response.status===200){
        let id =response.data.id;
        let photo ="http://134.175.154.93:8888/group1/"+id;
        console.log("==========",response);
        this.form.photo=photo;
        this.form=Object.assign({},this.form)
     }else{
       this.$message.error("上传异常！")
     }
    },
    removeHandler(){
      this.form.photo=""
    },
    DetailHandler(product){
      this.$router.push({
        path:"/basic/c_details",
        query:{product}
      })
    },
    deleteHandler(id) {
      let promise = this.deleteproductById(id);
      promise.then((response) => {
        this.$message({type:"success",message:response.statusText});
        this.findAllproducts(this.params);
      });
    },
    //2.增添产品方法
    toAddHandler(){
      this.form = {};
      this.setTitle("添加产品信息");
      this.showModal();
    },
    //3.提交产品信息方法
    submitHandler() {
      //表单验证
       this.$refs.productForm.validate((valid) => {
         if(valid) {
           //向后台提交表单信息
          this.saveOrUpdateproduct(this.form)
          .then((response) => {
            this.$message({type:"success",message:response.statusText});
            this.findAllproducts(this.params)
          })
         } else {
           return false;
         }
       })
    },
    //4.监听模态框关闭方法
    dialogCloseHandler() {
      this.$refs.productForm.clearValidate();
      this.fileList=[];
      this.closeModal();
    },
    //5.修改产品信息方法
    editHandler(row) {
      this.form = row;
      this.fileList.push({name:"原图",url:row.photo});
      this.setTitle("修改产品信息");
      this.showModal();
    },
    //6.批量删除
    batchDeleteHandler(){
      this.batchDeleteproducts(this.ids)
      .then((response) => {
        this.$message({type:"success",message:response.statusText});
        this.findAllproducts(this.params)
      })
    },
    //7.复选框多选id改变
    idsChangeHandler(val){
      this.ids = val.map(item => item.id);
    }
  }

}
</script>
<style scoped>

</style>
