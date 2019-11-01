import { get} from '../http/axios'

export default {
  namespaced: true,
  state: {
    orders:[],
    visible_pd:false
    // title:"添加订单信息",
  },
  mutations: {  
    showModal(state) {
      state.visible_pd = true
    },
    closeModal(state) {
      state.visible_pd = false
    },
    refreshorders(state, orders) {
      state.orders = orders
    }
  },
    getters: {
      countOrders(state){
        return state.orders.length;
      },
      orderStatusFilter(state){
        return function(status) {
          if (status) {
            return state.orders.filter(item => item.status === status)
          } else {
            return state.orders
          }
        }
      }
    },
  //   //1.打开模态框
  //   showModal(state) {
  //     state.visible = true;
  //   },
  //   //2.关闭模态框
  //   closeModal(state) {
  //     state.visible = false;
  //   },
  //   //3.设置模态框标题方法
  //   setTitle(state,title) {
  //     state.title = title;
  //   }
  actions: {
    // // 添加图片
    // async addFile(context){
    //   let response =await get ("/file/upload")
    // },
    //1.查询所有订单信息
    async findAllorders(context){
      let response = await get("/order/findAll");
      context.commit("refreshorders",response.data);
      // console.log(response);
    },
    async sendOrder(context,waiterform){
      let response= await get("/order/sendOrder",waiterform);
      // console.log(response)
      context.commit("orderStatusFilter");
      return response

    },
  //   //2.删除订单方法
  //   async deleteorderById(context,id) {
  //     let response = await get("/order/deleteById?id="+id);
  //     //刷新数据
  //     context.dispatch("findAllorders");
  //     return response;
  //   },
  //   //3.提交信息方法
  //   async saveOrUpdateorder({dispatch,commit},order) {
  //     let response = await post("/order/saveOrUpdate",order);
  //     commit("closeModal");
  //     dispatch("findAllorders");
  //     return response;
  //   },
  //   //4.批量删除
  //   async batchDeleteorders(context,ids){
  //     let response = await post_array("/order/batchDelete",{ids});
  //     context.dispatch("findAllorders");
  //     console.log(response);
  //     return response;
  //   }
  // }
 }
}
