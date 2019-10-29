import request from '@/utils/request'
export default {
  namespaced:true,
  state:{
    visible:false,
    waiters:[],
    title:"添加员工信息"
  },
  getters:{
    countwaiters:(state)=>{
      return state.waiters.length;
    },
    // 需要为获取器传递参数的写法
    waiterstatusFilter:(state)=>{
      return function(status){
        if(status){
          return state.waiters.filter(item=>item.status===status)
        } else {
          return state.waiters;
        }
      }
    }
  },
  mutations:{
    showModal(state){
      state.visible = true;
    },
    closeModal(state){
      state.visible = false;
    },
    // 需要接受一个参数，这个参数就是waiters
    refreshwaiters(state,waiters){
      console.log('state->',state);
      state.waiters = waiters;
    },
    setTitle(state,title){
      state.title = title;
    }
  },
  actions:{
    async batchDeletewaiters(context,ids){
      let response = await request.post("http://47.94.46.113:6677/waiter/batchDelete",{ids});
      context.dispatch("findAllwaiters")
      return response;
    },
    // async findAllwaiters({commit,dispatch,getters,state}){
    async findAllwaiters(context){
      console.log("context->",context);
      // 1. 查询所有员工信息
      let response = await request.get("http://47.94.46.113:6677/waiter/findAll");
      //alert(JSON.stringify(response));
      // 2. 将员工信息设置到state.waiters中
      context.commit("refreshwaiters",response.data)
    },
    async deletewaiterById({dispatch},id){
      // 1. 删除员工信息
      let response = await request.get("http://47.94.46.113:6677/waiter/deleteById?id="+id);
      // 2. 刷新
      dispatch("findAllwaiters")
      // 3. 提示成功
      return response;
    },
    async saveOrUpdatewaiter({dispatch,commit},waiter){
      // 1. 提交请求
      let response = await request.post("http://47.94.46.113:6677/waiter/saveOrUpdate",waiter)
      // 2. 关闭模态
      commit("closeModal");
      // 3. 刷新页面
      dispatch("findAllwaiters");
      // 4. 提示成功 react
      return response;
    }
  }
}