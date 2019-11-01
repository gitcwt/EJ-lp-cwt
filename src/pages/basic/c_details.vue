<template>
  <div class="cdetails">
    <h2>产品详情</h2> 
    <el-button type="text" size="small" @click="backHandler">返回</el-button>
    <p><strong>产品ID:</strong>{{product.id}}</p>    
    <p><strong>产品名称:</strong>{{product.name}}</p>
    <p><strong>产品描述:</strong>{{product.description}}</p>
    <p><strong>产品价格:</strong>{{product.price}}</p>
    <p><strong>产品大图:</strong><br><img :src="product.photo" alt=""></p>
  </div>
</template>
<script>
export default {
  data(){
    return{
      product:{}
    }
  },
  created() {
    console.log('当前路由', this.$route)
    this.product = this.$route.query.product
  },
  methods: {
    backHandler() {
      this.$router.go(-1)
    }
  }
}
</script>