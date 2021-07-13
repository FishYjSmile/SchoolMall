<template>
  <div id="cart-message-success">
    <div class="cart-message-success-frame">
      <div class="cart-message-success-title">
        <span>支付订单</span>
      </div>
      <div class="cart-message-success-body">
        <div class="cart-message-success-thank">
          <h1>提交订单成功,感谢您的支持</h1>
          <h5>请在 24 小时内完成支付，超时订单将自动取消。</h5>
        </div>
        <div class="cart-message-success-method">
          <div class="cart-message-success-method-frame">
            <span class="title">支付方式</span>
            <div class="methods">
              <div class="methods-other-wechat" @click="pay(0)"></div>
              <div class="methods-other-alipay" @click="pay(1)"></div>
              <div class="methods-other-upcash" @click="pay(2)"></div>
            </div>
          </div>
          <div class="cart-message-success-method-total">
            <p>订单金额</p>
            <div class="total-message">
              实际应付金额：
              <span>￥{{$store.state.CurrentTotalPrice}}</span>
              订单数量：
              <span>{{$store.state.CurrentTotalNum}}</span>
              
            </div>
            <div class="total-buttom" :class="{'total-buttom1' : payState != -1}" @click="point">
                立即支付
            </div>
           
          </div>
        </div>
        
      </div>
    </div>
    <div class="receive-message">
      <p>收 货 人 ：{{$store.state.Receive.NAME}}</p>
      <p>手 机 号 ：{{$store.state.Receive.PHONE}}</p>
      <p>接收地址：{{$store.state.Receive.ADDRESS}}</p>
      <p>邮政编码：{{$store.state.Receive.ZIP_CODE}}</p>
    </div>
    <PersonalMode>
      <template slot="left-one">商品信息</template>
      <template slot="center-three">单价</template>
      <template slot="right-one">数量</template>
      <template slot="right-two">小计</template>
    </PersonalMode>
    <PersonalMode1 v-for="(item,index) in $store.state.CurrentOrder" :key="index">
      <template slot="left-one">{{item.TITLE}}</template>
      <template slot="center-three">￥{{item.PRICE}}</template>
      <template slot="right-one">{{item.REPLACE_NUM}}</template>
      <template slot="right-two">￥{{item.PRICE}}</template>
    </PersonalMode1>
    <div class="receive-message receive-message-right">
      <p>商品总计 ：￥{{$store.state.CurrentTotalPrice}}</p>
      <p>运费 ：￥0.00</p>
    </div>
  </div>
</template>

<script>
import PersonalMode from '../personalitem/PersonalMode.vue'
import PersonalMode1 from '../personalitem/PersonalMode1.vue'
export default {
  data() {
    return {
      isShow:false,
      payState:-1,
    }
  },
  components: {
    PersonalMode,
    PersonalMode1
  },
  beforeRouteEnter (to, from, next) {     //组件内的守卫
      next(vm => {                  //beforeRouteEnter中不可以使用this关键字，要用vm来代替this
        vm.$store.commit('isNavbar',false)
      })
    },
    beforeRouteLeave (to, from, next) {
    this.$store.commit('isNavbar',true)
    next()
  },
  
  methods: {
    pay(num) {
      this.payState = num
      const dom0 = document.getElementsByClassName('methods-other-wechat')[0]
      const dom1 = document.getElementsByClassName('methods-other-alipay')[0]
      const dom2 = document.getElementsByClassName('methods-other-upcash')[0]
      switch (num) {
        case 0:
          dom0.style.border = '1px solid cornflowerblue';
          dom1.style.border = 'none';
          dom2.style.border = 'none';
          break;
        case 1:
          dom1.style.border = '1px solid cornflowerblue';
          dom0.style.border = 'none';
          dom2.style.border = 'none';
          break;
        case 2:
          dom2.style.border = '1px solid cornflowerblue';
          dom1.style.border = 'none';
          dom0.style.border = 'none';
          break;
      }
    },
    point() {
      if(this.payState != -1) {

      }else
      this.isShow = true
    },
    
  },
  }
</script>

<style scoped>
  #cart-message-success {
    width: 1200px;
    margin: 0 auto;
  }
  .cart-message-success-frame {
    width: 100%;
    height: 600px;
    background-color: #fff;
    padding: 50px;
  }
  .cart-message-success-title {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #d4d4d4;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 1px 7px rgb(0 0 0 / 6%);
    background-color: #eeeeee;
    font-size: 20px;

  }
  .cart-message-success-title span{
    position: relative;
    color: #3535358c;
    left: 22px;
    top: 14px;
  }
  .cart-message-success-body {
    width: 100%;
    height: 400px;
    background-color: #9e9e9e0d;
    border-radius: 0 0 10px 10px;
  }
  .cart-message-success-thank {
    width: 100%;
    height: 200px;
    text-align: center;
    line-height: 50px;
  }
  .cart-message-success-method {
    width: 100%;
    height: 150px;
    padding: 0px 50px 0px 50px;
  }
  .cart-message-success-method-frame {
    width: 100%;
    height: 150px;
    /* background-color: aquamarine; */
    border-bottom: 1px solid #d4d4d4;
    border-top: 1px solid #d4d4d4;
  }
  .cart-message-success-method-total {
    width: 100%;
    height: 50px;
    position: relative;
  }
  .title {
    position: relative;
    top: -20px;
    font-size: 17px;
  }
  .methods {
    width: 100%;
    position: relative;
    height: 110px;
  }
  .methods-other-wechat,.methods-other-alipay,.methods-other-upcash {
    transform: scale(0.5);
    width: 135px;
    float: left;
    position: absolute;
    top: -23px;
    height: 130px;
    cursor: pointer;
  }
  .methods-other-wechat {
    background-image: url('http://localhost:8081/img/login/EwB3RxWxp6.png');
    background-position: 0px 0px;
    left: 0px;
  }
  .methods-other-alipay {
    background-image: url('http://localhost:8081/img/login/EwB3RxWxp6.png');
    background-position: 0px -291px;
    left: 100px;
       
  }
  .methods-other-upcash {
    background-image: url('http://localhost:8081/img/login/EwB3RxWxp6.png');
    background-position: 0px 155px;
    left: 200px;
  }
  .cart-message-success-method-total p{
    position: relative;
    top: -20px;
    font-size: 17px;
  }
  .total-message {
    position: absolute;
    right: 239px;
    top: 16px;
  }
  .total-message span{
    color: red;
    
  }
  .total-buttom {
    width: 95px;
    height: 40px;
    position: absolute;
    background-color: rgb(194, 194, 194);
    right: 10px;
    top: 4px;
    border-radius: 10px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    cursor: not-allowed;
  }
  .total-buttom1 {
    width: 95px;
    height: 40px;
    position: absolute;
    background-color: cornflowerblue;
    right: 10px;
    top: 4px;
    border-radius: 10px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
  }
  .total-buttom1:hover {
    background-color: dodgerblue;
  }
  .receive-message {
    width: 100%;
    height: 200px;
    padding: 50px;
    margin: 0 auto;
    background-color: rgb(243, 243, 243);
    border-bottom: 1px solid #d3d3d3;
    border-top: 1px solid #d3d3d3;
  }
  .receive-message p{
    margin-top: 5px;
  }
  .receive-message-right {
    line-height: 30px;
  }
  .receive-message-right p{
    text-align: right;
  }
</style>