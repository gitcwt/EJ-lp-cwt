<template>
  <div class="waiter_details">
    <h2>员工详情</h2>
    <el-button type="primary" size="small" @click="backHandler">返回</el-button>
    <table class="table">
      <thead>
        <tr>
          <th>员工id</th>
          <th>用户名</th>
          <th>真实姓名</th>
          <th>密码</th>
          <th>电话</th>
      </tr>
      </thead>
      <tbody>
          <td>{{waiter.id}}</td>
          <td>{{waiter.username}}</td>
          <td>{{waiter.realname}}</td>
          <td>{{waiter.password}}</td>
          <td>{{waiter.telephone}}</td>
      </tbody>
      
    </table>
    <!-- {{waiter}} -->

  </div>
</template>
<script>
export default {
  data(){
    return{
      waiter:{}
    }
  },
  created() {
    console.log('当前路由', this.$route)
    this.waiter = this.$route.query.waiter
  },
  methods: {
    backHandler() {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
th,td{
  width: 200px;
  border-bottom:1px solid #ccc;
  text-align: center;
  line-height: 2em;
};
/* el-button{

} */
</style>