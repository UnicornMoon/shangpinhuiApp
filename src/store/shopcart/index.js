import { reqShopCartInfo,deleteShopCartById,reqGetChangeChecked  } from '@/api'
const state ={
  cartInfoList:[]
};
const mutations={
  GETSSHOPCART(state,cartInfoList){
    state.cartInfoList=cartInfoList
  }
};
const actions = {
  //获取个人购物车数据
  async getShopCartInfo({commit}){
    //params形参：当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
    let result = await reqShopCartInfo()
    if(result.code==200){
      commit('GETSSHOPCART',result.data)
    }
  },
  //删除某一个产品
  async deleteShopCart({commit},skuId){
    let result = await deleteShopCartById(skuId)
    if(result.code==200){
      return "ok"
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  //删除所有勾选的产品
  deleteAllCheckedShopCart({dispatch,getters}){
    let PromiseAll = [];
   getters.cartList.cartInfoList.forEach(item => {
    if(item.isChecked == 1){
      let promise = dispatch('deleteShopCart',item.skuId);
      PromiseAll.push(promise)
    }
   });
   //每一个promise都成功，才返回成功
   return Promise.all(PromiseAll)
  },
  //修改全部产品的选择状态
  changeAllShopCart({dispatch,getters},isChecked){
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach(item=>{
        let promise = dispatch('changeChecked',
        {skuId:item.skuId,
        isChecked:isChecked})
        PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  },
  //更改某个产品勾选状态
  async changeChecked({commit},{skuId, isChecked}){
    let result = await reqGetChangeChecked(skuId,isChecked)
    if(result.code==200){
      return "ok"
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
};
// 计算属性
// 在项目中为了简化数据而生 方便将来组件获取数据
const getters ={
  cartList(state){
    return state.cartInfoList[0]||[]
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}