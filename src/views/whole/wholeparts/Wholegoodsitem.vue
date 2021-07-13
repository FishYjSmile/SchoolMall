<template>
  <div id="whole-goods-item">
    <div class="goods-items" @mouseover="goodsshowbuttonover()" @mouseout="goodsshowbuttonout()">
      <div class="goods-img">
        <!-- {{item}} -->
        <!-- <img v-lazy="item.IMG_URL" alt="" width="150px" height="200px" @click="showDetail(item)"> -->
        <img :src="item.IMG_URL" alt="" width="200px" height="200px" @click="showDetail(item)">
        <!-- <el-image :src="item.IMG_URL" alt="" width="150px" height="200px" @click="showDetail(item)" :fit="fill"></el-image> -->

      </div>
      <div class="goods-font">
        <span class="whole-introduce1">{{item.TITLE}}</span>
        <span class="whole-introduce2">{{item.V_TITLE}}</span>
        <span class="whole-goods-price" v-show="goodsPriceShow">￥{{item.PRICE}}</span>
      </div>
      <div class="goods-button" v-show="goodsButtonShow" >
        <div class="goods-button-left" @click="showDetail(item)">查看详细</div>
        <div class="goods-button-right" @click="addCart(item.GOODS_ID,item.PRICE,item.TITLE,item.IMG_URL)" >加入购物车</div>
      </div>
  </div>
    </div>
    
</template>

<script>
export default {
  name: 'Wholegoodsitem',
  props: {
    item: {
      type:Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      goodsPriceShow : true,
      goodsButtonShow : false,
    }
  },
  methods: {
    goodsshowbuttonover() {
      this.goodsButtonShow = true
       this.goodsPriceShow = false
    },
    goodsshowbuttonout() {
      this.goodsButtonShow = false
      this.goodsPriceShow = true
    },
    showDetail(item) {
      this.$router.replace({path:'/details',query:{ID:item.GOODS_ID}})  //传送到id编号对应的详细商品信息
    },
    addCart(msg1,msg2,msg3,msg4) {
      
      if(this.$store.state.isLogin)   //用于判断用户是否登陆，登陆了才可以添加购物车
        this.$bus.$emit('addCart',msg1,msg2,msg3,msg4)
        // 发送时间总线,并把信息传给Cart组件
      else
        this.$router.replace('/User/Login')
      
      
    }
  },
  beforeRouteLeave (to, from, next) {
    this.goodsButtonShow = false
    this.goodsPriceShow = true
    next()
  }
}
</script>

<style>
  #whole-goods-item {
    width: 300px;
    height: 409px;
    position: absolute;
  }
  .goods-items {
    width: 300px;
    height: 409px;
    background-color: #fff;
    position: relative;
    transition: all .5s;
    border: 1px solid #42424218;
  }
  .goods-items:hover {
    margin-top: -10px;
    box-shadow: 0px 12px 80px #000;
    z-index: 1;
  }
  .goods-img {
    text-align: center;
    line-height: 20px;
  }
  .goods-img img {
    margin-top: 10px;
    cursor: pointer;
  }
  .goods-font {
    text-align: center;
  }
  .goods-font span{
    display: inline-block;
    width: 200px;
    margin-top: 20px;
  }
  .goods-button {
    text-align: center;
  }
  .whole-introduce1 {
    color: #424242;
    font-size:20px;
    overflow: hidden;
    text-overflow:ellipsis; 
    white-space: nowrap;
  }
  .whole-introduce2 {
    color: #d0d0d0;
    height: 20px;
    overflow: hidden;
    text-overflow:ellipsis; 
    white-space: nowrap;
  }
  .whole-goods-price {
    color:  #d44d44;
    font-size: 20px;
  }
  .goods-button {
    position: absolute;
    left: 39px;
    bottom: 73px;
  }
  .goods-button .goods-button-left,.goods-button-right{
    width: 100px;
    height: 34px;
    margin-left: 10px;
    float: left;
    cursor: pointer;
    /* background-color: #d44d44; */
    line-height: 34px;
    color: #fff;
    border-radius: 5px;
  }
  .goods-button .goods-button-left {
    background-color: cornflowerblue;
  }
  .goods-button .goods-button-left:hover {
    background-color: rgb(41, 111, 241);
  }
  .goods-button .goods-button-right {
    background-color: dodgerblue;
  }
  .goods-button .goods-button-right:hover {
    background-color: rgb(0, 128, 255);
  }
  
</style>