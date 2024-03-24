<template>
      <div class="swiper-container" id="floor1Swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel,index) in list" :key="index">
                <img :src="carousel.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name:'Carousel',
  props:['list'],
  watch:{
        list:{
            //立即监听：一上来就监听一次，否则监听不到，因为数据是父亲直接给的，没有发生变化
            immediate:true,
            handler(){
                //只能监听到数据已经有了，但渲染解构没法确定，因此还是要用$nextTick 延迟
                this.$nextTick(()=>{
                    var mySwiper = new Swiper ('.swiper-container', {
                        loop: true, // 循环模式选项
                        
                        // 如果需要分页器
                        pagination: {
                        el: '.swiper-pagination',
                        },
                        
                        // 如果需要前进后退按钮
                        navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        },
                        
                        // 如果需要滚动条
                        scrollbar: {
                        el: '.swiper-scrollbar',
                        },
                    })       
                })
            }
        }
    },
}
</script>

<style>

</style>