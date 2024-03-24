<template>
    <div>
        <TypeNav/>
        <ListContainer/>
        <TodayRec/>
        <Rank/>
        <Like/>
        <!-- Floor组件在自己的内部没有发请求，数据是父组件给的-->
        <Floor v-for="(floor,index) in floorList" :key="index" :floorList="floor"/>
        <Brand/>
    </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import TodayRec from '@/pages/Home/TodayRec'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'
export default {
   name:'',
   components:{
    ListContainer,TodayRec,Rank,Like,Floor,Brand
   },
   mounted(){
        this.$store.dispatch("getFloorList");
        this.$store.dispatch("getUserInfo");  
    },
    computed:{
        ...mapState({
            floorList:(state)=>{
                return state.home.floorList
            },
            // userInfo:(state)=>{
            //     return state.user.userInfo||[]
            // }
        })
    },
}
</script>

<style>

</style>