<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart, index) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked" @change="changeState(cart,$event)"/>
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handle('mins', -1, cart)">-</a>
            <input autocomplete="off" type="text" @change="handle('change', $event.target.value * 1, cart)" :value="cart.skuNum" minnum="1" class="itxt" />
            <a href="javascript:void(0)" class="plus" @click="handle('add', 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCart(cart.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck&&cartInfoList.length>0" @change="changeAlCheck($event)"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ this.totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from 'lodash/throttle';
export default {
  name: "ShopCart",
  mounted() {
    this.getDate();
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    //产品总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        if(item.isChecked == 1){
          sum += item.skuPrice * item.skuNum;
        }
      });
      return sum;
    },
    //判断底部复选框 是否全选
    isAllCheck() {
      //every遍历数组每个元素，看是否满足条件 返回bool值
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
  methods: {
    //获取个人的购物车内容
    getDate() {
      this.$store.dispatch("getShopCartInfo");
    },
    //更改产品数量 type为了区分操作类型 num是相比原先数据更改了多少 节流了
    handle:throttle(async function(type, num, cart) {
      switch (type) {
        //加号
        case "add":
          break;
        case "mins":
          //判断产品个数是否大于1
          if (cart.skuNum > 1) {
            num = -1;
          } else {
            num = 0;
          }
          break;
        case "change":
          //如果用户输入进来的非法
          if(isNaN(num)||num<1){
              num =  0
          }else{
            //大于1 但出现了小数
            num = parseInt(num)-cart.skuNum
          }
              break;
          }
          console.log(type, num, cart.skuId);
          try {
            //发请求 更改购物车数据
            await this.$store.dispatch("addOrUpdateShopCart", {
              skuId: cart.skuId,
              skuNum: num,
            });
            //更改后获取最新的数据
            this.getDate();
          } catch {}
    },5000),
    //删除购物车商品
    async deleteCart(id){
      try{
          await this.$store.dispatch('deleteShopCart',id);
          this.getDate;
      }catch(error){
          alert(error.message)
      }
      this.getDate();
    },
    //切换商品选中状态
    async changeState(cart,event){
      try{
          let isChecked =  event.target.checked?"1": "0"
          await this.$store.dispatch('changeChecked',{
            skuId:cart.skuId,
            isChecked
          })
          this.getDate()
        }catch(error){
          alert(error.message)
      }
    },
    //删除所有选中的商品
    async deleteAllCheckedCart(){
      try{
        await this.$store.dispatch('deleteAllCheckedShopCart')
        this.getDate()
      }catch(error){
        alert('cuowu')
      }
    },
    //修改全部产品的选择状态
    async changeAlCheck($event){
      try{
        let isAllCheck = $event.target.checked?'1':'0'
        await this.$store.dispatch('changeAllShopCart',isAllCheck)
        this.getDate()
      }catch(error){
        alert('cuowu')
      }
    }
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
