//对于axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css";
//引入仓库
import store from '@/store';

//1:利用axios对象的方法create，去创建一个axios实例
//2：request就是axios，只是稍微配置一下
let requests = axios.create({
  //配置对象
  //基础路径：发送请求的时候，路径当中会自动出现api
  baseURL:"/api", //不加地址的话默认本地
  //代表请求超时的时间5s
  timeout:5000
});

//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事
requests.interceptors.request.use((config)=>{
  //config:配置对象：对象里有一个属性很重要:headers请求头
  if(store.state.detail.uuid_token){
    //请求头添加一个字段，和后端商量好了 不是想加就加
    config.headers.userTempId = store.state.detail.uuid_token
  }
  //需要携带token带给服务器
  if(store.state.user.token){
    config.headers.token = store.state.user.token
  }
  //进度条开始
  nprogress.start();
  return config;
})

//响应拦截器
requests.interceptors.response.use((res)=>{
  //成功的回调函数：服务器响应数据回来以后，响应拦截器都可以检测到，可以做一些事情
  //进度条结束
  nprogress.done();
  return res.data
},(error)=>{
  //响应失败的回调函数，终结promise链
  return Promise.reject(new Error('fasle'))
})


export default requests;