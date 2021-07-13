<template>
<div>
    <div class="cartitem-frame" v-if="ShowLocation">
      <div class="cartitem-title">
        <p>收货地址</p>
      </div>
      <div class="cart-address">
        <div class="cart-address-item" v-for="(item,index) in $store.state.CartItemData[0]" :key="index" :class="{'cart-address-item1': index === Current}"  @click="CurrentIndex(index)" >
          <div class="cart-address-item3">
            <p>收 货 人 ：{{item.NAME}}</p>
            <p>手 机 号 ：{{item.PHONE}}</p>
            <p>收货地址：{{item.ADDRESS}}</p>
            <p>邮政编码：{{item.ZIP_CODE}}</p>
          </div>
          <div class="cart-address-item4" :class="{'cart-address-item5' : Current === index}">
            <div class="cart-address-item4-left" @click="$store.commit('Tooltip',true)">
              <p>修改地址</p>
            </div>
            <div class="cart-address-item4-right" @click="DeleteLogistics()">
              <p>删除地址</p>
            </div>
          </div>
        </div>
        
        <div class="cart-address-item"  @click="$store.commit('Tooltip1',true)">
          <div class="cart-address-item2">
            <font-awesome-icon :icon="['fas', 'plus-circle']"></font-awesome-icon>
            <p>使用新地址</p>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-item">
      <div class="cartitem-title">
        <p>购物清单</p>
      </div>
      <PersonalMode>
        <template slot="left-one">商品信息</template>
        <template slot="center-three">单价</template>
        <template slot="right-one">数量</template>
        <template slot="right-two">小计</template>
        <!-- <template slot="right-three">操作</template> -->
      </PersonalMode>
      <PersonalItem v-for="(item,index) in this.$store.state.cartmsg" :key="index">
        <!-- <template slot="left-one">item.TIT</template> -->
        <template slot="left-one"><img :src="item.IMG_URL" alt="" width="100px" style="position: relative;top:8px"></template>
        <template slot="left-two">{{item.TITLE}}</template>
        <template slot="center-three">￥{{item.PRICE}}</template>
        <template slot="right-one">{{item.REPLACE_NUM}}</template>
        <template slot="right-two">￥{{item.PRICE*item.REPLACE_NUM}}</template>
        <!-- <template slot="right-three">X</template> -->
      </PersonalItem>
      <div class="personal-buttom-frame">
        <div class="personal-totalNum1">
          共计
          <span>{{$store.state.TotalNum}}</span>
          件商品
        </div>
        <div class="personal-totalNum2">
          应付金额：
          <span>￥{{TotalPrice}}</span>
          
        </div>
        <div class="personal-buttom1" v-if="!($store.state.cartmsg.length)" >
          结算
        </div>
        <div class="personal-buttom2" @click="ShowLocationMessage" v-if="!ShowLocation" >
          结算
        </div>
        <div class="personal-buttom3" v-if="Current === -1 " @click="open">
          提交订单
        </div>
        <div class="personal-buttom4" v-if="ShowLocation" @click="ShowLocationOrder()">
          提交订单
        </div>
        
      </div>
  </div>
  <PopUp v-if="$store.state.Tooltip || $store.state.Tooltip1" :PopItem="PopItem" :Current="Current" :PopUpMessage="PopUpMessage" :ShowLocation="ShowLocation">
    <template slot="0"><input type="text" class="pop-up-input-2" placeholder="收货人"  v-model="PopUpMessage.NAME"></template>
    <template slot="1"><input type="text" class="pop-up-input-2" placeholder="手机号" v-model="PopUpMessage.PHONE"></template>
    <template slot="2"><input type="text" class="pop-up-input-2" placeholder="收货地址" v-model="PopUpMessage.ADDRESS"></template>
    <template slot="3"><input type="text" class="pop-up-input-2" placeholder="邮政编码" v-model="PopUpMessage.ZIP_CODE"></template>
    <template slot="change" v-if="$store.state.Tooltip">确认修改</template>
    <template slot="add" v-if="$store.state.Tooltip1">确认添加</template>
    <!-- <template slot="change">确认添加</template> -->
  </PopUp>
</div>
  
</template>

<script>
import PersonalMode from '../personalitem/PersonalMode'       //导入模板组件用于显示顶部信息
import PersonalItem from '../personalitem/PersonalItem'        //导入模板组件用于显示商品信息
import PopUp from '../../components/popup/PopUp'

import {DeleteLogisticsTest} from '../../network/logistics'
import {getorders,insertorders,insertordersnum,getordersnum} from '../../network/orders'
import {deleteAllcarts} from '../../network/carts'
export default {
  data() {
    return {
      // TotalNum:0,
      TotalPrice:0,
      Current:-1,
      ShowLocation:false,
      LogisticsMessage:[],
      PopItem:['收货人','手机号','收货地址','邮政编码'],
      PopUpMessage: {       //存放输入框信息
        PHONE:null,
        ADDRESS:null,
        NAME:null,
        ZIP_CODE:null,
        ID:null
      },
      OrderMessage: [],    //存放订单信息
      OrderNum:[],        //存放订单编号
      // ArrOrder:[],        //存储当前订单相同的值
      noprice:false,      //价格为0时不显示
    }
  },
  watch: {          //对vuex里的属性进行监听
    '$store.state.cartmsg':{      //对对象进行操作
      handler(val)  {
         let num = 0
        let price = 0
        for (let index = 0; index < val.length; index++) {
          num += parseInt(val[index].REPLACE_NUM);
          price += parseInt(val[index].PRICE)*parseInt(val[index].REPLACE_NUM)
        }
        this.$store.commit('TotalNum',num)
        this.TotalPrice = price
        this.$store.commit('cartTotalPrice',this.TotalPrice)
      },
      deep: true,
      immediate: true,        //使watch立刻先执行一遍
    },  
    
    Current(val) {            //当点击修改将原本内容显示
      if(val!=-1){            //-1作为判断条件
        this.PopUpMessage.PHONE = this.$store.state.CartItemData[0][val].PHONE    
        this.PopUpMessage.ADDRESS = this.$store.state.CartItemData[0][val].ADDRESS
        this.PopUpMessage.NAME = this.$store.state.CartItemData[0][val].NAME
        this.PopUpMessage.ZIP_CODE = this.$store.state.CartItemData[0][val].ZIP_CODE
        this.PopUpMessage.ID = this.$store.state.CartItemData[0][val].ID
      // console.log(this.$store.state.CartItemData[0][val].PHONE);
      }
      
    },
    
  },
  beforeRouteEnter (to, from, next) {     //组件内的守卫
    next(vm => {                  //beforeRouteEnter中不可以使用this关键字，要用vm来代替this
      vm.$store.commit('isNavbar',false)
    })
  },
  beforeRouteLeave (to, from, next) {
	 // 导航离开该组件的对应路由时调用,可以使用this关键字
	 // 可以访问组件实例 `this`
   this.$store.commit('isNavbar',true)
  //  this.SelectLogisticsTest(this.$store.state.username)      //请求客户地址信息
   next()
 },
 components: {
   PersonalMode,
   PersonalItem,
   PopUp
 },
 methods: {
   CurrentIndex(msg) {      //设置Current数组位于第几个
     this.Current = msg
     this.$store.commit('Receive',this.$store.state.CartItemData[0][msg])   //存储当前选中的地址信息
   },
   ShowLocationMessage() {
     if(this.$store.state.cartmsg.length !== 0) 
       this.ShowLocation = true
   },
   DeleteLogistics() {
     if(this.$store.state.CartItemData) {
       DeleteLogisticsTest(this.$store.state.username,this.PopUpMessage.ID)
      console.log(this.PopUpMessage.ID);
       this.$store.commit('CartItemDataDelete',[this.Current])
       setTimeout(() => {       //每次点击完就更新，避免出现信息不更新情况
       this.Current = -1      
     }, 0);
       
     }
     
   },
   ShowLocationOrder() {
     if(this.Current !== -1 && this.$store.state.cartmsg.length) {
      this.getRandom()
      this.insertordersTest()      //插入当前订单
      this.insertordersnumTest()    //插入订单号
      setTimeout(() => {
        this.getordersTest()         //更新显示订单
        this.getordersnumTest()       //更新订单编号
        this.$store.commit('changeIslogin',true)     //重新加载购物车navigation的购物车模块
        this.$store.commit('OrderRefresh')    //更新订单信息
      }, 0);
      const arr = []
      this.$store.commit('cartMsg',arr)    //初始化当前vuex的购物车信息
      deleteAllcarts(this.$store.state.username)   //删除数据库中的购物车信息
      this.$store.commit('changeIslogin',false)    //重新加载购物车navigation的购物车模块

      this.$router.replace('/Cart/OrderMessage')
    }
     
   },
   insertordersTest() {
      if(this.$store.state.username){
        if(this.$store.state.cartmsg) {
          for (let index = 0; index < this.$store.state.cartmsg.length; index++) {
            const obj = {}
            obj.USERNAME = this.$store.state.username
            obj.ORDER_NUM = this.$store.state.OrderNum
            obj.TIME = this.$store.state.OrderTime
            obj.GOODS_ID = this.$store.state.cartmsg[index].GOODS_ID
            obj.PRICE = this.$store.state.cartmsg[index].PRICE
            obj.TITLE = this.$store.state.cartmsg[index].TITLE
            obj.IMG_URL = this.$store.state.cartmsg[index].IMG_URL
            obj.REPLACE_NUM = this.$store.state.cartmsg[index].REPLACE_NUM
            insertorders(obj).then( res => {
            if(res.status === 200) {
              console.log('ok');
            }
            })
          }
        }
      }
    },
    insertordersnumTest() {
      if(this.$store.state.username){
        const obj = {}
        obj.USERNAME = this.$store.state.username
        obj.ORDER_NUM = this.$store.state.OrderNum
        obj.TIME = this.$store.state.OrderTime
        insertordersnum(obj).then(res => {
          console.log("ok");
        } )
      }
    },
    getRandom() {       //随机生成订单号和时间
      let date = new Date()
      this.RandomOrder = date.getTime().toString() + Math.ceil(Math.random()*100)   //生成随机订单号数
      let Y,M,D,h,m
      Y = date.getFullYear().toString()
      M = (date.getMonth() + 1) < 10 ? ("0"+(date.getMonth() + 1)) : (date.getMonth() + 1).toString()
      D = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate().toString()
      h = date.getHours() < 10 ? ("0" + date.getHours()) : date.getHours().toString()
      m = date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes().toString()
      this.CurrentTime = Y + "-" + M + "-" + D + " " + h + ":" + m
      this.$store.commit('OrderNum',this.RandomOrder)
      this.$store.commit('OrderTime',this.CurrentTime)
    },
    getordersTest() {             
      if(this.$store.state.username){
        // const obj = {}
        // obj.USERNAME = this.$store.state.username
        // obj.ORDER_NUM = 
        getorders(this.$store.state.username).then(res => {
        if(res.status === 200) {
          const result = res.data.split(/[,=]/)
          // console.log(result);
          let i = 0
          for (let index = 0; index < (result.length-1)/16; index++) {
            const messageObj = {}
            messageObj[result[i]] = result[i+1];
            messageObj[result[i+2]] = result[i+3];
            messageObj[result[i+4]] = result[i+5];
            messageObj[result[i+6]] = result[i+7];
            messageObj[result[i+8]] = result[i+9];
            messageObj[result[i+10]] = result[i+11];
            messageObj[result[i+12]] = result[i+13];
            messageObj[result[i+14]] = result[i+15];
            this.OrderMessage.push(messageObj)
            i += 16;
          }
          console.log( this.OrderMessage);
          this.$store.commit('OrderMessage',this.OrderMessage)
          this.FindOrder()          //存储当前订单的信息

        }
        })
      }
      
    },
    getordersnumTest() {             
      if(this.$store.state.username){
        const obj = {}
        obj.USERNAME = this.$store.state.username
        getordersnum(obj).then(res => {
        if(res.status === 200) {
          const result = res.data.split(/[,=]/)
          // console.log(result);
          let i = 0
          for (let index = 0; index < (result.length-1)/6; index++) {
            const messageObj = {}
            messageObj[result[i]] = result[i+1];
            messageObj[result[i+2]] = result[i+3];
            messageObj[result[i+4]] = result[i+5];
            this.OrderNum.push(messageObj)
            i += 6;
          }
          console.log( this.OrderNum);
          this.$store.commit('OrderNumMessage',this.OrderNum)
        }
        })
      }
      
    },
    FindOrder() {         //获取当前的订单信息商品
      let price = 0
      let num = 0
      let ArrOrder = []
      for (let index = 0; index < this.$store.state.OrderMessage.length; index++) {
        if(this.$store.state.OrderNum === this.$store.state.OrderMessage[index].ORDER_NUM) {
          ArrOrder.push(this.$store.state.OrderMessage[index])
          price += parseFloat(this.$store.state.OrderMessage[index].PRICE)*parseInt(this.$store.state.OrderMessage[index].REPLACE_NUM)
          num += parseFloat(this.$store.state.OrderMessage[index].REPLACE_NUM)
        }
      }
      this.$store.commit('CurrentOrder',ArrOrder)
      this.$store.commit('CurrentTotalPrice',price)
      this.$store.commit('CurrentTotalNum',num)

      
    },
    open() {
      this.$alert('请在上面选中一个收货地址', '提示', {
          confirmButtonText: '确定',
          
        });
    }
   
 },
 
}
</script>

<style>
  .cartitem-frame{
    width: 1200px;
    margin:  0 auto;
    border-radius: 10px;
    margin-bottom: 100px;
    box-shadow: 0px 1px 5px rgb(212, 212, 212);
    position: relative;
  }
  .cart-item {
    width: 1200px;
    margin:  0 auto;
    border-radius: 10px;
    border: 1px solid #e9e9e9;
    margin-bottom: 100px;
    margin-top: 50px;
    box-shadow: 0px 1px 5px rgb(212, 212, 212);
  }
  .cartitem-title{
    width: 100%;
    height: 50px;
    background-color: #dadada;
    border-radius: 10px 10px 0 0;
    color: #333;
    font-size: 18px;
    cursor: pointer;
    float: left;
    /* margin-top: 50px; */
  }
  .cartitem-title:hover{
    background-color: #cecece;
    color: rgb(80, 80, 80);
  }
  .cartitem-title p{
    position: relative;
    left: 21px;
    top: 15px;
  }
  .personal-buttom-frame {
    width: 100%;
    height: 100px;
    /* background-color: crimson; */
    position: relative;
    border-top: 1px solid #e9e9e9;
  }
  .personal-buttom2 ,.personal-buttom4{
    position: absolute;
    width: 135px;
    height: 60px;
    background-color: deepskyblue;
    right: 45px;
    top: 22px;
    border-radius: 10px;
    color: #fff;
    font-size: 25px;
    text-align: center;
    line-height: 60px;
    cursor: pointer;
  }
  .personal-buttom2:hover ,.personal-buttom4:hover{
    color: rgb(235, 235, 235);
    background-color: rgb(97, 146, 236)
  }
  .personal-totalNum1 {
    position: absolute;
    top: 20px;
    right: 300px;
  }
  .personal-totalNum2 {
    position: absolute;
    top: 56px;
    right: 300px;
  }
  .personal-totalNum1 span {
    font-size: 20px;
    color: red;
  }
  .personal-totalNum2 span {
    font-size: 20px;
    color: red;
  }
  .cart-address {
    width: 100%;
    padding: 27px;
    display: block;
    float: left;
  }
  .cart-address-item {
    float: left;
    width: 246px;
    height: 170px;
    margin-left: 30px;
    background-color: #66666626;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .cart-address-item:hover {
    background-color: #66666633;
  }
  .cart-address-item1 {
    border: 1px solid cornflowerblue;
    background-color: #66666633;
  }
  .cart-address-item .cart-address-item2 {
    font-size: 18px;
    position: relative;
    top: 70px;
  }
  .cart-address-item3 {
    text-align: left;
    position: absolute;
    left: 20px;
    top: 28px;
  }
  .cart-address-item3 p{
    width: 200px;
    margin-top: 5px;
    overflow: hidden;
    text-overflow:ellipsis; 
    white-space: nowrap;
  }
  .cart-address-item4 {
    width: 244px;
    height: 50px;
    background-color: #fff;
    position: absolute;
    left: 0px;
    top: 170px;
    display: flex;
    transition: all 0.5s;
    line-height: 50px;
  }
  .cart-address-item5 {
    top: 117px;
    
  }
  .cart-address-item4-left,.cart-address-item4-right {
    flex: 1;
    border: 1px solid #9e9e9e2e;
    color: deepskyblue;
  }
  .cart-address-item4-left:hover,.cart-address-item4-right:hover {
    border: 1px solid #9e9e9e2e;
    color: rgb(4, 171, 226);
    background-color: rgb(248, 248, 248);
  }
  
  .personal-buttom1{
    background-color: #9e9e9e;
    position: absolute;
    width: 135px;
    height: 60px;
    right: 45px;
    top: 22px;
    border-radius: 10px;
    color: #fff;
    font-size: 25px;
    text-align: center;
    line-height: 60px;
    cursor: not-allowed;
    z-index: 4;
  }
  .personal-buttom2 {
    z-index: 3;
  }
  .personal-buttom3 {
    background-color: #9e9e9e;
    position: absolute;
    width: 135px;
    height: 60px;
    right: 45px;
    top: 22px;
    border-radius: 10px;
    color: #fff;
    font-size: 25px;
    text-align: center;
    line-height: 60px;
    cursor: not-allowed;
    z-index: 2;
  }
  .personal-buttom4 {
    z-index: 1;
    
  }
  
 
</style>