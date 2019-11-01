<template>
  <div class="order">
    <h2>订单详情</h2>
    <el-button type="primary" size="small" @click="backHandler">返回</el-button>
    <el-row>
      <el-col :span="8">
        <el-table :data="customer" size="medium">
            <el-table-column prop="id" label="顾客ID"></el-table-column>
            <el-table-column prop="telephone" label="电话"></el-table-column>
            <el-table-column prop="password" label="密码"></el-table-column>
            <el-table-column prop="realname" label="顾客姓名"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="8">
         <el-table :data="waiter" size="medium">
            <el-table-column prop="id" label="员工ID"></el-table-column>
            <el-table-column prop="telephone" label="电话"></el-table-column>
            <el-table-column prop="password" label="密码"></el-table-column>
            <el-table-column prop="realname" label="员工姓名"></el-table-column>
         </el-table>
      </el-col>
      <el-col :span="8">
         <el-table :data="address" size="medium">
            <el-table-column prop="id" label="地址ID"></el-table-column>
            <el-table-column prop="province" label="省份"></el-table-column>
            <el-table-column prop="city" label="城市"></el-table-column>
            <el-table-column prop="area" label="县区"></el-table-column>
            <el-table-column prop="address" label="街道"></el-table-column>
         </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
   data(){
    return{
      order:[],
      customer:[],
      address:[],
      waiter:[]
    }
  },
  created() {
    this.order.push(this.$route.query.order);
    this.order.forEach((item,index,array)=>{
      this.customer.push(array[0].customer)
      this.address.push(array[0].address)
      this.waiter.push(array[0].waiter)
    })
  },
  methods: {
    backHandler() {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
 /* .order el-table-column{
   height:80px
 } */
</style>