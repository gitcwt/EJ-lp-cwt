<template>
  <div class="order">
    <h2>订单详情</h2>
    <el-button type="primary" size="small" @click="backHandler">返回</el-button>
    <el-row>
      <el-col :span="12">
        <el-table :data="customer" size="medium">
            <el-table-column prop="id" label="顾客ID"></el-table-column>
            <el-table-column prop="telephone" label="电话"></el-table-column>
            <el-table-column prop="password" label="密码"></el-table-column>
            <el-table-column prop="realname" label="顾客姓名"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
         <el-table :data="waiter" size="medium">
            <el-table-column prop="id" label="员工ID"></el-table-column>
            <el-table-column prop="telephone" label="电话"></el-table-column>
            <el-table-column prop="password" label="密码"></el-table-column>
            <el-table-column prop="realname" label="员工姓名"></el-table-column>
         </el-table>
      </el-col>
    </el-row>
    <p><strong>地址ID:</strong>{{address.id}}</p>    
    <p><strong>省份:</strong>{{address.province}}</p>
    <p><strong>城市:</strong>{{address.city}}</p>
    <p><strong>县区:</strong>{{address.area}}</p>
    <p><strong>街道:</strong>{{address.address}}</p>
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
      this.address=array[0].address
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