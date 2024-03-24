//引入一级路由组件
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import Search from '@/pages/Search';
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'

//引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

//当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把
// 不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
// const Foo = () =>  import('./Foo.vue')

//定义路由
export default [
  { 
    //重定向 默认时
    path: '/', 
    redirect: '/home' 
  },
  {
    path:'/center',
    //路由懒加载 简写
    component: () =>  import('@/pages/Center'),
    meta:{
      isshowFooter:true
    },
    //二级路由组件
    children:[
      {
        //重定向 默认时
        path: '/center', 
        redirect: '/center/myorder' 
      },
      {
        path:'myorder',
        component:MyOrder
      },{
        path:'grouporder',
        component:GroupOrder
      }
    ]
  },
  {
    path:'/paySuccess',
    component:()=>import('@/pages/PaySuccess'),
    meta:{
      isshowFooter:true
    }
  },
  {
    path:'/pay',
    component:Pay,
    meta:{
      isshowFooter:true
    },
     //路由独享守卫
    beforeEnter: (to, from,next) => {
      //支付页必须是从交易页来
      if(from.path == '/trade'){
        next()
      }else{
        //其他页面来，停留在当前页面
        next(false)
      }
    },
  },
  {
    path:'/trade',
    component:Trade,
    meta:{
      isshowFooter:true
    },
    //路由独享守卫
    beforeEnter: (to, from,next) => {
      //去交易页必须是从购物车来
      if(from.path == '/shopCart'){
        next()
      }else{
        //其他页面来，停留在当前页面
        next(false)
      }
    },
  },
  {
    path:'/shopCart',
    component:ShopCart,
    meta:{
      isshowFooter:true
    }
  },
  {
    path:'/addCartSuccess',
    name:'addCartSuccess',
    component:AddCartSuccess,
    meta:{
      isshowFooter:true
    }
  },
  {
    path:'/detail/:skuId',
    component:Detail,
    meta:{
      isshowFooter:true
    }
  },
  {
    path:'/home',
    component:()=>import('@/pages/Home'),
    meta:{
      isshowFooter:true
    }
  },
  {
    path:'/register',
    component:Register,
    meta:{
      isshowFooter:false
    }
  },
  {
    path:'/login',
    component:Login,
    meta:{
      isshowFooter:false
    }
  },
  {
    //当使用pramas参数传参时，需要使用/:符号占位。
    //若又有pramas参数和query参数则使用？代表参数是可选的
    path:'/search/:keyword?',
    name:'search',
    component:Search,
    meta:{
      isshowFooter:true
    }
  }
]
