<template>
     <!--楼层-->
     <div class="floor">
            <div class="py-container">
                <div class="title clearfix">
                    <h3 class="fl">{{floorList.name}}</h3>
                    <div class="fr">
                        <ul class="nav-tabs clearfix">
                            <li :class="{active:currentId==index}" v-for="(c2,index) in floorList.navList" :key="index">
                                <a :href="c2.url"  @mouseenter="changeId(index)" @mouseleave="renewId" data-toggle="tab">{{ c2.text }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="tab-content">
                    <div class="tab-pane">
                        <div class="floor-1">
                            <div class="blockgary">
                                <ul class="jd-list">
                                    <li v-for="(keyword,index) in floorList.keywords" :key="index">{{keyword}}</li>
                                </ul>
                                <img :src="floorList.imgUrl" />
                            </div>
                            <div class="floorBanner">
                                <Carousel :list="floorList.carouselList"/>
                            </div>
                            <div class="split">
                                <span class="floor-x-line"></span>
                                <div class="floor-conver-pit">
                                    <img :src="floorList.recommendList[0]"/>
                                </div>
                                <div class="floor-conver-pit">
                                    <img :src="floorList.recommendList[1]" />
                                </div>
                            </div>
                            <div class="split center">
                                <img :src="floorList.bigImg" />
                            </div>
                            <div class="split">
                                <span class="floor-x-line"></span>
                                <div class="floor-conver-pit">
                                    <img :src="floorList.recommendList[2]" />
                                </div>
                                <div class="floor-conver-pit">
                                    <img :src="floorList.recommendList[3]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name:'',
    props:['floorList'],
    data(){
        return{
            currentId:-1
        }
    },
    methods:{
        changeId(index){
            this.currentId=index
        },
        renewId(){
            this.currentId=-1
        }
    },

    mounted(){
        // 第一次书写轮播图时，是在当前组件内部发请求，动态渲染解构，这里不适用
        // 不需要特殊处理的原因是：请求是父组件发的，数据是父组件通过props传递过来的，结构已经有了
        // var mySwiper = new Swiper ('.swiper-container', {
        //     loop: true, // 循环模式选项
            
        //     // 如果需要分页器
        //     pagination: {
        //     el: '.swiper-pagination',
        //     },
            
        //     // 如果需要前进后退按钮
        //     navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev',
        //     },
            
        //     // 如果需要滚动条
        //     scrollbar: {
        //     el: '.swiper-scrollbar',
        //     },
        // })       
    }
}
</script>

<style scoped lang="less">
 .floor {
        margin-top: 15px;

        .py-container {
            width: 1200px;
            margin: 0 auto;

            .title {
                .fl {
                    float: left;
                    color: #c81623;
                    font-size: 20px;
                    line-height: 30px;
                    margin: 9px 0;
                    font-weight: 700;
                }

                .fr {
                    float: right;

                    .nav-tabs {
                        margin: 10px 0 0;
                        display: inline-block;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                padding-top: 1px;
                                font-weight: 400;
                                background-color: #fff;

                                &::after {
                                    content: "|";
                                    padding: 0 10px;
                                }
                            }

                            &:nth-child(7) {
                                a {
                                    &::after {
                                        content: "";
                                    }
                                }
                            }

                            &.active {
                                a {
                                    color: #e1251b;
                                }
                            }
                        }
                    }
                }
            }

            .tab-content {
                border-top: 2px solid #c81623;
                border-bottom: 1px solid #e4e4e4;

                .tab-pane {
                    .floor-1 {
                        height: 360px;
                        display: flex;

                        .blockgary {
                            width: 210px;
                            height: 100%;
                            background: #f7f7f7;

                            .jd-list {
                                padding: 15px 0;
                                overflow: hidden;

                                li {
                                    list-style-type: none;
                                    float: left;
                                    width: 40%;
                                    margin: 0 10px;
                                    border-bottom: 1px solid #e4e4e4;
                                    text-align: center;
                                    line-height: 26px;
                                }
                            }

                            img {
                                width: 100%;
                            }
                        }

                        .floorBanner {
                            width: 330px;
                            height: 100%;
                        }

                        .split {
                            width: 220px;
                            height: 100%;
                            position: relative;

                            .floor-x-line {
                                position: absolute;
                                background: #e4e4e4;
                                width: 220px;
                                height: 1px;
                                top: 180px;
                            }

                            .floor-conver-pit {
                                width: 100%;
                                height: 50%;

                                img {
                                    width: 100%;
                                    height: 100%;
                                    transition: all 400ms;

                                    &:hover {
                                        opacity: 0.8;
                                    }
                                }
                            }
                        }

                        .center {
                            border: 1px solid #e4e4e4;
                        }
                    }
                }
            }
        }
    }

</style>