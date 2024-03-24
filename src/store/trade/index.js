import {  reqGetUserAddressList,reqOrderInfo } from '@/api'
const state ={
  userAddressList:[],
  orderInfo:{}
};
const mutations={
  USERADDRESSLIST(state,userAddressList){
    state.userAddressList = userAddressList
  },
  ORDERINFO(state,orderInfo){
    state.orderInfo = orderInfo
  },
};
const actions = {
  //获取用户地址信息
  async getUserAddressList({commit}){
    let result = await reqGetUserAddressList()
    if(result.code==200){
      commit('USERADDRESSLIST',result.data)
    }
  },
   //获取商品清单
   async getOrderInfo({commit}){
    let result = await reqOrderInfo()
    if(result.code==200){
      commit('ORDERINFO',result.data)
    }
  },
};
// 计算属性
// 在项目中为了简化数据而生 方便将来组件获取数据
const getters ={
  
};
export default {
  state,
  mutations,
  actions,
  getters
}