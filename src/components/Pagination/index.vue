<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button  v-if="starNumAndEndNum.start>1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
    <button v-if="starNumAndEndNum.start>2">···</button>

    <button v-for="(page,index) in starNumAndEndNum.end" :key="index" 
    v-if="page>=starNumAndEndNum.start" @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">
    {{page}}
    </button>

    <button v-if="starNumAndEndNum.end < totalPage-1" >···</button>
    <button v-if="starNumAndEndNum.end<totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{ totalPage }}</button>
    <button  :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
import { start } from 'nprogress';
  export default {
    name: "Pagination",
    props:["pageNo","pageSize","total","continues"],
   
    computed:{
      //总共多少页
      totalPage(){
        //向上取整
        return Math.ceil(this.total/this.pageSize);
      },
      //计算连续页码的起始数字和结束数字
      starNumAndEndNum(){
        const { continues, pageNo, totalPage } = this;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        let start = 0,end = 0;
        if(continues>totalPage){
          //总页数没有连续页码多
          start = 1;
          end = totalPage;
        }else{
          //正常现象
          start = pageNo - parseInt( continues/2);
          end = pageNo + parseInt( continues/2);
          //临界情况
          if(start < 1){
            start = 1;
            end =  continues;
          }
          if(end>totalPage){
            end = totalPage;
            start = totalPage - continues + 1;
          }
        }
        return {start,end}
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
  text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: bo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    rder-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>