//使用步骤：
// 1）在项目scr文件中创建mock文件夹
// 2）准备json数据，在mock文件夹中创建相应的json文件---记得格式化，不能留空格
// 3）把mock数据需要的图片放置到public文件夹中（public文件夹打包时，会把相应的字资源原封不动打包到dist文件夹
// 4）创建mockSever.js实现

import Mock from 'mockjs'
//webpack默认 图片和json格式不需要对外暴露
import banners from './banners'
import floors from './floors'
import userAddress from './userAddress'

//mock数据：第一个参数是请求地址  第二个参数：请求数据
Mock.mock("/mock/banners",{code:200,data:banners});
Mock.mock("/mock/floors",{code:200,data:floors});
Mock.mock("/mock/findUserAddressList",{code:200,data:userAddress})