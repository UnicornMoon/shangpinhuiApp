import { reqGetSendCode,reqRegister,reqLogin,reqGetUserInfo,reqLogout  } from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token'

const state ={
  code:'',
  token:getToken(),
  userInfo:''
};
const mutations={
  GETSENDCODE(state,code){
    state.code=code
  },
  USERLOGIN(state,token){
    state.token= token
  },
  GETUSERINFO(state,userInfo){
    state.userInfo = userInfo
  },
  //清除本地数据
  CLEAR(state){
    state.token=''
    state.userInfo={},
    removeToken()
  }
};
const actions = {
  //获取验证码 正常情况应该后台把验证码发用户手机上
  async getSendCode({commit},phone){
    //params形参：当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
    let result = await reqGetSendCode(phone)
    if(result.code==200){
      commit('GETSENDCODE',result.data)
    }
  },
  //注册
  async userRegister({commit},userData){
    let result = await reqRegister(userData)
    if(result.code==200){
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  //登录【token(令牌）】
  async userLogin({commit},userData){
    let result = await reqLogin(userData)
    //服务器下发token，用户唯一标识(uuid)
    //将来经常通过带token找服务器要用户信息进行展示
    if(result.code==200){
       //用户成功登录且 获取到token
      commit('USERLOGIN',result.data.token)
      //持久化存储token
      setToken(result.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  //校验token获取用户信息
  async getUserInfo({commit}){
    let result = await reqGetUserInfo()
    if(result.code==200){
      commit('GETUSERINFO',result.data)
      return 'ok'
    }
  },
  //退出登录
  async userLogout({commit}){
    let result = await reqLogout()
    if(result.code==200){
      commit('CLEAR')
      removeToken('TOKEN')
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
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