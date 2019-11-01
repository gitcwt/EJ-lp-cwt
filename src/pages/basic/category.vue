<template>
  <div class="category">
    <h2>栏目管理</h2>
    <!-- 按钮 -->
    <div class="btns">
			<el-button @click="toAddHandler" type="primary" size="small">添加</el-button>
			<el-button type="danger" size="small" @click="batchDeleteHandler">批量删除</el-button>
		</div>
    <!-- 表单开始 -->
    <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
      <el-form :model="form" :rules="rules" ref="categoryForm">
        <el-form-item label="栏目名称" label-width="80px" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" label-width="80px" prop="num">
          <el-input v-model="form.num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" label-width="80px">
          <el-upload 
            class="upload-demo"
            action="http://134.175.154.93:6677/file/upload"
            :file-list="fileList"
            :on-success="uploadSuccessHandler"
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
    <el-table :data="categories" size="small" @selection-change="idsChangeHandler">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="栏目名称"></el-table-column>
      <el-table-column prop="num" label="数量"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template v-slot:default="record">
          <img :src="record.row.icon">
        </template>
      </el-table-column>
      <el-table-column prop="parentId" label="上级栏目"></el-table-column>
      <el-table-column label="操作" width="100px" align="center">
        <template #default="record">
          <a href="" class="el-icon-delete" @click.prevent = "deleteHandler(record.row.id)"></a> &nbsp;
          <a href="" class="el-icon-edit-outline" @click.prevent = "editHandler(record.row)"></a> &nbsp;
          <a href=""  @click.prevent = "">详情</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格结束 -->
    <!-- 分页开始 -->
    <!-- <el-pagination
			@current-change="pageChangeHandler"
	    layout="prev, pager, next"
	    :current-page="categories.page+1"
	    :page-size="categories.pageSize"
	    :total="categories.total">
	  </el-pagination> -->
    <!-- /分页结束 -->
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
// import { Context } from 'tern';
export default {
  data() {
    return {
      form: {},
      fileList:[],
      ids:[],
      //表单验证规则
      rules:{
        name: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
        ],
        num:[
          { required: true, message: '请输入数量', trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    this.findAllCategories()
  },
  computed: {
    ...mapState("category",["categories","visible","title"])
  },
  methods: {
    //动作
    ...mapActions("category",["findAllCategories","deleteCategoryById","saveOrUpdateCategory","batchDeleteCategories"]),
    //突变
    ...mapMutations("category",["pageChangeHandler","showModal","closeModal","setTitle"]),
    //普通方法
    //1.删除方法
    deleteHandler(id) {
      let promise = this.deleteCategoryById(id);
      promise.then((response) => {
        this.$message({type:"success",message:response.statusText});
        this.findAllCategories()
      })
    },
    uploadSuccessHandler(response){
      // 获取返回值ID
     if(response.status===200){
        let id =response.data.id;
        let icon ="http://134.175.154.93:8888/group1/"+id;
        console.log("==========",response);
        this.form.icon=icon;
        this.form=Object.assign({},this.form)
     }else{
       this.$message.error("上传异常！")
     }
    },
    //2.增添栏目方法
    toAddHandler(){
      this.form = {};
      this.setTitle("添加栏目信息");
      this.showModal();
    },
    //3.提交栏目信息方法
    submitHandler() {
      //表单验证
       this.$refs.categoryForm.validate((valid) => {
         if(valid) {
           //向后台提交表单信息
          this.saveOrUpdateCategory(this.form)
          .then((response) => {
            this.$message({type:"success",message:response.statusText});
            this.findAllCategories()            
          })
         } else {
           return false;
         }
       })
    },
    //4.监听模态框关闭方法
    dialogCloseHandler() {
      this.$refs.categoryForm.clearValidate();
      this.closeModal();
    },
    //5.修改栏目信息方法
    editHandler(row) {
      this.form = row;
      this.fileList.push({name:"原图",url:row.icon});
      this.setTitle("修改栏目信息");
      this.showModal();
    },
    //6.批量删除
    batchDeleteHandler(){
      this.batchDeleteCategories(this.ids)
      .then((response) => {
        this.$message({type:"success",message:response.statusText});
        this.findAllCategories()
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
