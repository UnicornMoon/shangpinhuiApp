import { reqCategoryList,reqGetBannerList,reqGetFloorList } from "@/api";
//state:仓库存储数据的地方
const state = {
  //初始值和返回值类型要一致
  categoryList:[],
  bannerList:[],
  floorList:[],
};
//mutations：修改state的唯一手段
const mutations={
  CATEGORYLIST(state,categoryList){
    state.categoryList=categoryList;
  },
  BANNERLIST(state,bannerList){
    state.bannerList=bannerList;
  },
  FLOORLIST(state,floorList){
    state.floorList=floorList
  }
};
//action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions={
  //可以书写业务逻辑，不能修改state
  //通过API里的接口函数调用，向服务器发请求，获取服务器数据
  async categoryList({commit}){
    //返回Promise对象，拿到成功后的结果
    let result =await reqCategoryList();
    if(result.code==200){
      commit("CATEGORYLIST",result.data)
    }
  },
  //获取首页轮播图数据
  async getBannerList({commit}){
    //返回Promise对象，拿到成功后的结果
    let result =await reqGetBannerList();
    if(result.code==200){
      commit("BANNERLIST",result.data)
    }
  },
  //获取floor数据
  async getFloorList({commit}){
    //返回Promise对象，拿到成功后的结果
    let result =await reqGetFloorList();
    if(result.code==200){
      commit("FLOORLIST",result.data)
    }
  },
};
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更方便
const getters={};
export default {
  state,
  mutations,
  actions,
  getters
}