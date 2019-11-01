import { get, post, post_array } from '../http/axios'

export default {
  namespaced: true,
  state: {
    visible:false,
    categories:[],
    title:"添加栏目信息",
  },
  mutations: {
    showModal(state) {
      state.visible = true
    },
    closeModal(state) {
      state.visible = false
    },
    refreshCategories(state, categories) {
      state.categories = categories
    },
    // //分页改变函数
    // pageChangeHandler(state,currentPage){
    //   state.params.page = currentPage-1;
    // },
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
    //1.查询所有栏目信息
    async findAllCategories(context){
      let response = await get("/category/findAll");
      context.commit("refreshCategories",response.data)
    },
    //2.删除栏目方法
    async deleteCategoryById(context,id) {
      let response = await get("/category/deleteById?id="+id);
      //刷新数据
      context.dispatch("findAllCategories");
      return response;
    },
    //3.提交信息方法
    async saveOrUpdateCategory({dispatch,commit},category) {
      let response = await post("/category/saveOrUpdate",category);
      commit("closeModal");
      dispatch("findAllCategories");
      return response;
    },
    //4.批量删除
    async batchDeleteCategories(context,ids){
      let response = await post_array("/category/batchDelete",{ids});
      context.dispatch("findAllCategories");
      console.log(response);
      return response;
    }
  }
}
