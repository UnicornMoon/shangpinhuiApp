import { reqGetSearchInfo } from "@/api";

const state ={
  searchList:{}
};
const mutations={
  GETSEARCHLIST(state,searchList){
    state.searchList=searchList
  }
};
const actions = {
  async getSearchList({commit},params={}){
    //params形参：当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
    let result = await reqGetSearchInfo(params)
    if(result.code==200){
      commit('GETSEARCHLIST',result.data)
    }
  }
};
// 计算属性
// 在项目中为了简化数据而生 方便将来组件获取数据
const getters ={
  goodsList(state){
    //假如网络不给力或者没网（服务器数据还没回来 就开始遍历了），返回一个空数组
    return state.searchList.goodsList||[]
  },
  attrsList(state){
    return state.searchList.attrsList
  },
  trademarkList(state){
    return state.searchList.trademarkList
  }

};
export default {
  state,
  mutations,
  actions,
  getters
}