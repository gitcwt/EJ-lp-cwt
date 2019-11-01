import { get, post, post_array } from '../http/axios'

export default {
  namespaced: true,
  state: {
    visible:false,
    products:[],
    title:"添加产品信息",
  },
  mutations: {
    showModal(state) {
      state.visible = true
    },
    closeModal(state) {
      state.visible = false
    },
    refreshproducts(state, products) {
      state.products = products
    },
    //1.打开模态框
    showModal(state) {
      state.visible = true;
    },
    //2.关闭模态框
    closeModal(state) {
      state.visible = false;
    },
    //3.设置模态框标题方法
    setTitle(state,title) {
      state.title = title;
    }
  },
  actions: {
    // // 添加图片
    // async addFile(context){
    //   let response =await get ("/file/upload")
    // },
    //1.查询所有产品信息
    async findAllproducts(context,params){
      let response = await post("/product/query",params);
      context.commit("refreshproducts",response.data);
      // console.log(response);
    },
    //2.删除产品方法
    async deleteproductById(context,id) {
      let response = await get("/product/deleteById?id="+id);
      //刷新数据
      context.dispatch("findAllproducts");
      return response;
    },
    //3.提交信息方法
    async saveOrUpdateproduct({dispatch,commit},product) {
      let response = await post("/product/saveOrUpdate",product);
      commit("closeModal");
      dispatch("findAllproducts");
      return response;
    },
    //4.批量删除
    async batchDeleteproducts(context,ids){
      let response = await post_array("/product/batchDelete",{ids});
      context.dispatch("findAllproducts");
      console.log(response);
      return response;
    }
  }
}
