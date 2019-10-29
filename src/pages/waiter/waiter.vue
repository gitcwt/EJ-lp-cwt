<template>
  <div class="waiter">
    <h2>员工管理</h2>
		<!-- 按钮 -->
		<div class="btns">
			<el-button @click="toAddHandler" type="primary" size="small">添加</el-button>
			<el-button type="danger" size="small" @click="batchDeleteHandler">批量删除</el-button>
		</div>
		<!-- 表单 -->
    <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
      <el-form :model="form" :rules="rules" ref="waiterForm">
        <el-form-item label="姓名" label-width="60px" prop="realname">
          <el-input v-model="form.realname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="60px" prop="telephone">
          <el-input v-model="form.telephone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal" size="small">取 消</el-button>
        <el-button type="primary" @click="submitHandler" size="small">确 定</el-button>
      </div>
    </el-dialog>
		<!-- 表格 -->
    <el-table :data="waiters" size="small" @selection-change="idsChangeHandler">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="realname" label="姓名"></el-table-column>
      <el-table-column prop="telephone" label="手机号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column label="操作" width="100px" align="center">
        <template #default="record">
          <a href="" class="el-icon-delete" @click.prevent = "deleteHandler(record.row.id)"></a> &nbsp;
          <a href="" class="el-icon-edit-outline" @click.prevent = "editHandler(record.row)"></a>
          <a href=""  @click.prevent = "toDetails(record.row)">详情</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  data(){
    return {
      ids:[],
      form:{},
      rules:{
        realname: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
        ],
        telephone:[
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    this.findAllwaiters();
  },
  computed:{
    ...mapState("waiter",["waiters","visible","title"]),
    ...mapGetters("waiter",["countwaiters","waiterStatusFilter"])
    // 普通属性

  },
  methods:{
    ...mapActions("waiter",["findAllwaiters","deletewaiterById","saveOrUpdatewaiter","batchDeletewaiters"]),
    ...mapMutations("waiter",["showModal","closeModal","setTitle"]),
    // 普通方法
    toDetails(waiter){
      // 跳转到顾客详情页面
      this.$router.push({
        path:'/waiter/details',
        query:{waiter},
        // params:{id:1}
      })
    },
    batchDeleteHandler(){
      this.batchDeletewaiters(this.ids)
      .then((response)=>{
        this.$message({type:"success",message:response.statusText});
      })
    },
    idsChangeHandler(val){
      this.ids = val.map(item => item.id);
    },
    dialogCloseHandler(){
      this.$refs.waiterForm.clearValidate();
      this.closeModal()
    },
    toAddHandler(){
      this.form = {};
      this.setTitle("添加员工信息")
      this.showModal();
    },
    submitHandler(){
      // 1.表单验证
      this.$refs.waiterForm.validate((valid)=>{
        if(valid){
          // 2.提交表单
          this.saveOrUpdatewaiter(this.form)
          .then((response)=>{
            this.$message({type:"success",message:response.statusText});
          })
        } else {
          return false;
        }
      });
      
    },
    deleteHandler(id){
      let promise = this.deletewaiterById(id)
      promise.then((response)=>{
        this.$message({type:"success",message:response.statusText});
      })
    },
    editHandler(row){
      this.form = row;
      this.setTitle("修改员工信息")
      this.showModal();
    }
  }
}
</script>
<style scoped>

</style>