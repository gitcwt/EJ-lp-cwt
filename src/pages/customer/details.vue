<template>
  <div class="customer_details">
    <h2>顾客详情</h2>
    <el-button type="primary" size="small" @click="backHandler">返回</el-button>
    <table class="table">
      <thead>
        <tr>
          <th>顾客id</th>
          <th>用户名</th>
          <th>真实姓名</th>
          <th>密码</th>
          <th>电话</th>
      </tr>
      </thead>
      <tbody>
          <td>{{customer.id}}</td>
          <td>{{customer.username}}</td>
          <td>{{customer.realname}}</td>
          <td>{{customer.password}}</td>
          <td>{{customer.telephone}}</td>
      </tbody>
      
    </table>
    <!-- {{customer}} -->

  </div>
</template>
<script>
export default {
  data(){
    return{
      customer:{}
    }
  },
  created() {
    console.log('当前路由', this.$route)
    this.customer = this.$route.query.customer
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