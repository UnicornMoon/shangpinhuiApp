import { reqGetOrderList } from '@/api'

const state={
  orderList:[]
};
const mutations={
  GETORDERLIST(state,orderList){
    state.orderList=orderList
  }
};
const actions={
  //获取商品详情信息
  async getOrderList({commit},{page,limit}){
    //返回Promise对象，拿到成功后的结果
    let result =await reqGetOrderList(page,limit);
    console.log(result)
    if(result.code==200){
      commit("GETORDERLIST",result.data)
    }
  },
 
};
const getters={
  //路径导航数据
  categoryView(state){
    return state.goodInfo.categoryView||{}
  },
 
};

export default{
  state,
  mutations,
  actions,
  getters
}