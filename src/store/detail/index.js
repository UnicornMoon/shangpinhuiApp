import {reqGoodInfo,reqAddOrUpdateShopCart } from '@/api'
//封装游客身份模块 生成一个随机的字符串，但生成后不能改变
import {getUUID} from '@/utils/uuid_token'
const state={
  goodInfo:{},
  uuid_token:getUUID()
};
const mutations={
  GETGOODINFO(state,goodInfo){
    state.goodInfo=goodInfo
  }
};
const actions={
  //获取商品详情信息
  async getGoodInfo({commit},skuId){
    //返回Promise对象，拿到成功后的结果
    let result =await reqGoodInfo(skuId);
    if(result.code==200){
      commit("GETGOODINFO",result.data)
    }
  },
  //将产品添加到购物车中 参数解构了
  async addOrUpdateShopCart({commit},{skuId,skuNum}){
    //服务器写入数据成功，并没有返回其他数据，不需要三连环存储数据 
    // async返回一个promise对象 result是promise对象 要么成功，要么失败
    let result = await reqAddOrUpdateShopCart(skuId,skuNum);
    if(result.code==200){
      return 'ok'
    }else{
      //Promise.reject()是一个返回一个拒绝状态的Promise对象的静态方法。它用于创建一个已经被拒绝的Promise，可以用来表示异步操作失败的情况。
      // 参数通常是一个错误对象或错误信息，作为拒绝的原因
      return Promise.reject(new Error('failed'))
    }
  }
};
const getters={
  //路径导航数据
  categoryView(state){
    return state.goodInfo.categoryView||{}
  },
  //商品信息数据
  skuInfo(state){
    return state.goodInfo.skuInfo||{}
  },
  //售卖属性数据
  spuSaleAttrList(){
    return state.goodInfo.spuSaleAttrList||[]
  }
};

export default{
  state,
  mutations,
  actions,
  getters
}