<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <table class="order-item" v-for="(order, index) in orderList.records" :key="order.id">
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle"
                  >{{ order.expireTime }}　订单编号：{{ order.outTradeNo }} <span class="pull-right delete"><img src="../images/delete.png" /></span
                ></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, index) in order.orderDetailList" :key="record.skuId">
              <td width="60%">
                <div class="typographic">
                  <img :src="record.imgUrl" style="height: 100px; width: 100px" />
                  <a href="#" class="block-text">{{ record.skuName }}</a>
                  <span>x{{ record.skuNum }}</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
              <td rowspan="2" width="8%" class="center" v-if="index == 0">{{ order.consignee }}</td>
              <td rowspan="2" width="13%" class="center" v-if="index == 0">
                <ul class="unstyled">
                  <li>总金额¥{{ order.totalAmount }}</li>
                  <li>在线支付</li>
                </ul>
              </td>
              <td rowspan="2" width="8%" class="center" v-if="index == 0">
                <a href="#" class="btn">{{ order.orderStatusName }} </a>
              </td>
              <td rowspan="2" width="13%" class="center" v-if="index == 0">
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="choose-order">
        <!-- 分页器 -->
        <Pagination :pageNo="page" :pageSize="limit" :total="orderList.total" :continues="5" @getPageNo="getPageNo" />
      </div>
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike02.png" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data(){
    return{
      page:1,
      limit:3
    }
  },
  computed: {
    ...mapState({
      orderList: (state) => {
        return state.center.orderList;
      },
    }),
  },
  mounted() {
   this.getData()
  },
  methods:{
    getData(){
      this.$store.dispatch("getOrderList", { page: this.page, limit: this.limit });
    },
    //获取当前的页数
    getPageNo(pageNo){
      this.page = pageNo;
      this.getData();
    }
  }
};
</script>

<style></style>
