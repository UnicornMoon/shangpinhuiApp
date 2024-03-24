<template>
     <div>
          <Header/>
          <router-view></router-view>
          <Footer v-show="$route.meta.isshowFooter"/>
     </div>
    
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
     components:{
        Header,Footer
    },
    mounted(){
      //通知Vuex发请求，获取数据，存储与仓库中
      //考虑优化性能，根组件只执行一次
      this.$store.dispatch('categoryList');
    }
}
</script>

<style>

</style>