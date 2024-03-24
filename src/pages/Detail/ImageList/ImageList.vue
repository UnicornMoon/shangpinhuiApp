<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide,index) in skuImageList" :key="slide.id"
      @click="changeCurrent(index)">
        <img :src="slide.imgUrl" :class="{ active:currentIndex == index }">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    data(){
      return{
        currentIndex: 0
      }
    },
    props:['skuImageList'],
    watch:{
      skuImageList(newValue,oldValue){
        this.$nextTick(()=>{
          new Swiper ('.swiper-container', {
                // 如果需要前进后退按钮
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
                slidesPerView : 3,//'auto'
                  //slidesPerView : 3.7,
                  //如果设置为auto（例如制作全屏展示时的页脚部分），最后一个slide在键盘或鼠标滚动时可能会直接跳到倒数第三个slide，
                  //此时可以手动设置activeIndex解决，如下
                onTransitionEnd: function(swiper){
                  if(swiper.progress==1){
                    swiper.activeIndex=swiper.slides.length-1
                  }
                },
                // slidesPerView : 3,
                // slidesPerGroup : 3,
            
              })     
        })
      }
    },
    methods:{
      changeCurrent(index){
        this.currentIndex = index
        //通知兄弟组件，当前索引值为几
        this.$bus.$emit('getIndex',this.currentIndex)
      }
    }
                                                                                                                             
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>