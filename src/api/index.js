//当前这个模块：API统一管理
import requests from "./realAjax";
import mockRequests from "./mockAjax";

//三级联动接口
//api/product/getBaseCategoryList get 无参数

export const reqCategoryList= () => {
  //发请求:axios发请求返回结果是promise对象
  //第一种：函数写法
  return requests({url:'/product/getBaseCategoryList',method:'get'},)
}

//获取轮播图banner  
//第二种：对象写法
export const reqGetBannerList = () => mockRequests.get("/banners")


//获取floor
export const reqGetFloorList = () =>{
  return mockRequests({url:'/floors',method:'get'})
}

//获取搜索模块的数据 /api/list POST 要带参数
//当前这个接口，传递的参数至少是一个空对象
export const reqGetSearchInfo = (params) => requests({
    url:'/list', 
    method:"post",
    data:params
})

//获取产品详情
export const reqGoodInfo =(skuId)=> requests({
  url:`/item/${skuId}`,
  method:"get"
})

//加入购物车（或者更新购物车中产品个数） /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart =(skuId,skuNum)=> requests({
  url:`/cart/addToCart/${ skuId }/${ skuNum }`,
  method:"post"
})

//获取购物车数据
export const reqShopCartInfo =()=> requests({
  url:'/cart/cartList',
  method:"get"
})

//删除购物车商品
export const deleteShopCartById =(skuId) => requests({
  url:`/cart/deleteCart/${skuId}`,
  method:"delete"
})

//切换商品选中状态
export const reqGetChangeChecked =(skuID, isChecked)=>requests({
  url:`/cart/checkCart/${skuID}/${isChecked}`,
  method:'get'
})

// 获取验证码 /api/user/passport/sendCode/phone
export const reqGetSendCode =(phone)=>requests({
  url:`/user/passport/sendCode/${phone}`,
  method:'get'
})

//注册用户
export const reqRegister =(data)=>requests({
  url:'/user/passport/register',
  method:"post",
  data,
})

//登录  
export const reqLogin =(data)=>requests({
  url:'/user/passport/login',
  method:"post",
  data,
})

//token校验获取用户信息 
export const reqGetUserInfo =()=>requests({
  url:'/user/passport/auth/getUserInfo',
  method:"get",
})

//退出登录 /api/user/passport/logout
export const reqLogout =()=>requests({
  url:'/user/passport/logout',
  method:"get",
})

//获取用户地址信息
export const reqGetUserAddressList=()=>mockRequests({
  url:'/findUserAddressList',
  method:"get",
})

//获取商品清单
export const reqOrderInfo=()=>requests({
  url:'/order/auth/trade',
  method:"get",
})

//提交订单
export const reqSubmitOrder=(tradeNo,data)=>requests({
  url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
  method:"post",
  data
})

//获取订单支付信息
export const reqGetPayment=(orderId)=>requests({
  url:`/payment/weixin/createNative/${orderId}`,
  method:"get",
})

//查询支付订单状态 
export const reqPayStatus=(orderId)=>requests({
  url:`/payment/weixin/queryPayStatus/${orderId}`,
  method:"get",
})

//获取我的订单列表
export const reqGetOrderList=(page,limit)=>requests({
  url:`/order/auth/${page}/${limit}`,
  method:"get",
})