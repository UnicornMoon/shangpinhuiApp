import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '@/store';
// 安装 VueRouter
Vue.use(VueRouter);
import { removeToken } from '@/utils/token';
//先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写push和replace 解决多次触发导航式路由时会报错
//第一个参数：跳转路径
VueRouter.prototype.push = function push(location,resolve,reject){
  if(resolve && reject){
    //call||apply区别
    //相同点：都可以调用函数一次，都可以篡改上下文一次
    //不同点：call与apply传递参数，call传递参数用逗号隔开，apply方法执行，传递
    originPush.call(this,location,resolve,reject)
  }else{
    originPush.call(this,location,()=>{ },()=>{})
  }
},
VueRouter.prototype.replace = function replace(location,resolve,reject){
  if(resolve && reject){
    //call||apply区别
    //相同点：都可以调用函数一次，都可以篡改上下文一次
    //不同点：call与apply传递参数，call传递参数用逗号隔开，apply方法执行，传递
    originReplace.call(this,location,resolve,reject)
  }else{
    originReplace.call(this,location,()=>{ },()=>{})
  }
}

// 创建路由实例
let router = new VueRouter({
  routes,
  // 可选项：'hash'（默认）或 'history'

  //滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部 vue3是top：0
    return { y: 0 }
  },
});

// 全局守卫：前置守卫（在路由跳转之前判断）
router.beforeEach(async(to, from, next) => {
  //to：可以获取到你要跳转到哪个路由信息
  //from：可以获取到你从哪个路由而来
  //next:放行函数
  next()
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  //用户已经登录了  
  if(token){
    next()
    //用戶登录后还想去login
    if(to.path=='/login'||to.path=='/register'){
      next('/home')
    }else{
      // 用户登录后去别的路由
      //如果用户名已有
      if(name){
        next()
      }else{
        //没有用户信息，派发action让仓库存储
        try{
          //获取用户信息成功
          await store.dispatch('getUserInfo');
          next()
        }catch(error){
          //token过期了，获取不到用户信息，需重新登录
          alert('用户登录过期')
          await store.dispatch('userLogout');
          next('/login')
        }
      }
    }
  }else{
    //未登录
    let topath = to.path
    if(to.path=='/pay'||to.path=='/center'||to.path=='/trade'){
      // 把未登录时没有去成的路径，存储于地址栏【路由】中
      next(`/login?redirect=${topath}`)
    }else{
      next()
    }
  }
})

// 导出路由实例
export default router;