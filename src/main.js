import Vue from 'vue'
import App from './App.vue'

//引入elementUI的部分组件
import { Button, MessageBox  } from 'element-ui';
//elementUI第一种注册全局组件的方法
// Vue.component(Button.name, Button);
//elementUI第二种注册全局组件的方法（挂在原型上）
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//将三级联动组件注册为全局组件  (如果该组件在很多模块里都使用)
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
//第一个参数：全局组件名字，第二个参数：全局组件
Vue.component(TypeNav.name,TypeNav); //全局组件使用时，不需要引入
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);

//引入路由
import router from '@/router'
//引入仓库
import store from './store'
//引入mock,执行一次
import '@/mock/mockSever'
// 引入swiper样式
import "swiper/css/swiper.min.css"
import zs from '@/assets/1.gif'
//引入插件
import "@/plugins/validate" //直接运行
import VueLazyload from 'vue-lazyload'
//注册插件
Vue.use(VueLazyload, {
  //懒加载默认图片
  loading: zs,
})

//统一接口api文件夹里面全部请求函数
import * as API from '@/api'
new Vue({
  //注册路由：组件身上都拥有$route,$router属性
  router,
  //注册仓库：组件身上都拥有$store属性
  store,
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
  }
}).$mount('#app')
