<template>
  <div id="cart" v-if="$store.state.Refresh">
    <!-- {{cartMsg.page}}
    {{cartmsgArr[0].page}} -->
    <!-- {{$store.state.cartmsg}} -->
    <!-- {{cartmsgArr.length}} -->
    <!-- 这里只要将数组中的元素进行遍历之后再显示即可完成购物车模块 -->
    <div class="cart-empty" v-show="cartmsgArr.length === 0">
      <p class="cart-empty-img"><font-awesome-icon :icon="['fas', 'shopping-cart']"></font-awesome-icon></p>
      <p class="cart-empty-font">您的购物车居然是空的!</p>
    </div>
    <div class="cart-frame" v-for="(item,index) in cartmsgArr" :key="index" @mouseover="cartCancelOver(index)" @mouseout="cartCancelOut">
      <div @click="jumpDetail(item.GOODS_ID)">
        <!-- <img class="cart-img" v-lazy="item.IMG_URL" alt="" width="50px" height="50px"> -->
        <img class="cart-img" :src="item.IMG_URL" alt="" width="50px" height="50px">
        <div class="cart-message">
        <p class="cart-title">{{item.TITLE}}</p>
        <p class="cart-price">￥{{item.PRICE}}</p>
        <p class="cart-repeatNum">×{{item.REPLACE_NUM}}</p>
        </div>
      </div>
      <span class="cart-cancel" v-show="index === currentCancel" @click="cartCancel(index,item.PRICE,item.REPLACE_NUM,item.GOODS_ID)"><font-awesome-icon :icon="['fas', 'window-close']"></font-awesome-icon></span>
    </div>
  </div>
</template>

<script>
import {getcarts,insertcarts,updatecarts,deletecarts} from '../../network/carts'
import {SelectLogisticsTest} from '../../network/logistics'
export default {
  name:'Cart',
  created() {
    this.getcartsTest()           //请求客户购物车信息
    this.SelectLogisticsTest(this.$store.state.username)      //请求客户地址信息
    // this.currentTotalNum = this.cartmsgArr.length
  },
  data() {
    return{
      cartmsgArr:[],
      cartCancelShow:false,
      currentCancel:-1,
      currentRepeat:false,
      currentRepeatNum:1,
      currentTotalPrice:0,
      currentTotalNum:0,  //商品的种类别
      currentTotalNum1:0,  //商品的重复个数+1
      itemmessage:[],   //中间递交数组
      // cartUser:[],
      LogisticsMessage:[]    //客户物流信息
    }
  },
  methods: {
    cartCancelOver(index) {
      if(index === this.currentCancel)
        this.cartCancelShow = true
      else
        this.cartCancelShow = false
      this.currentCancel = index
    },
    cartCancelOut() {
       this.cartCancelShow = false
       this.currentCancel = -1
    },
    cartCancel(index,num,num2,num3) {        //num表示当前要删除哪一项的价格进行转换    num2表示一共选中了多少次，添加了多少个这个商品   num3表示商品编号
      deletecarts(num3,this.$store.state.username)                //将数据库中的对应商品删除
      this.cartmsgArr.splice(index,1)   //用于显示当前点击到的某个商品，进行取消，在数组中删除次项
      this.currentTotalPrice -= num2*parseFloat(num.replace(/￥/g,''))   // 用于每次删除都将重量价格进行减去，利用正则把字符串中的￥去除
      this.currentTotalNum1 -= num2-1   //删除商品应该重复部分为num-1
      this.currentTotalNum--             //每删除一个商品，每一个商品的种类应该-1
      this.$store.commit('cartMsg',this.cartmsgArr)    //更新vuex中的购物车信息

    },
    jumpDetail(msg) {   
      this.$router.push({
        path:'/details',
        query: {
          ID: msg
        }
      })
      this.$store.dispatch('refreshNumActions')
      //用于实现异步url请求   （已解决）
      // 给router-view添加一个唯一给key <router-view :key="$route.fullPath"/> "
    },
    getcartsTest() {
      getcarts(this.$store.state.username).then(res => {
        // this.cartUser = res.data
        // alert(this.cartUser)
        if(res.status === 200){
            const result = res.data.split(/[,=]/)
            // console.log(result);
            let i = 0
            let cartUser = []
            let currentTotalPrice = 0
            let currentTotalNum1 = 0
            for (let index = 0; index < (result.length-1)/12; index++) {
              const messageObj = {}
              // console.log(i);
              messageObj[result[i]] = result[i+1];
              messageObj[result[i+2]] = result[i+3];
              messageObj[result[i+4]] = result[i+5];
              messageObj[result[i+6]] = result[i+7];
              messageObj[result[i+8]] = result[i+9];
              messageObj[result[i+10]] = result[i+11];
              cartUser.push(messageObj)    //将后台数据存入数组中
              
              i += 12;  //根据数据库的情况，两两一组一共6组，12个
            }
            
            // cartUser = JSON.parse(JSON.stringify(this.cartUser))    //数据无法正常显示的原因是（数据对象的 __ob__ 属性）只需要将其转换为json
            // console.log(cartUser);
            this.cartmsgArr = cartUser
            // if(cartUser)
            for (let index = 0; index < this.cartmsgArr.length; index++) {
              currentTotalPrice += parseInt(this.cartmsgArr[index].PRICE*this.cartmsgArr[index].REPLACE_NUM)   //当数据库中存在数据时，添加此时的总价格
              currentTotalNum1 += (parseInt(this.cartmsgArr[index].REPLACE_NUM)-1)  //用于初始化当前的重复个数
            }
            this.currentTotalPrice = currentTotalPrice
            this.currentTotalNum1 = currentTotalNum1
            this.currentTotalNum = this.cartmsgArr.length   //用于初始化商品种类
            if(this.$store.state.cartmsg.length !== this.cartmsgArr.length) {
              this.$store.commit('cartMsg',this.cartmsgArr)    //更新vuex中的购物车信息
            }else {
              for (let index = 0; index < this.$store.state.cartmsg.length; index++) {
                if(this.$store.state.cartmsg[index].REPLACE_NUM !== this.cartmsgArr[index].REPLACE_NUM) {
                  this.$store.commit('cartMsg',this.cartmsgArr)    //更新vuex中的购物车信息
                }
              }
            }
            
            
            // console.log(this.cartmsgArr);
            // console.log(this.cartUser);
        }
      })
    },
    SelectLogisticsTest(msg) {            //查询客户信息
      SelectLogisticsTest(msg).then(res => {
          if(res.status === 200){
            const result = res.data.split(/[,=]/)
            let i = 0
            for (let index = 0; index < (result.length-1)/12; index++) {
              const messageObj = {}
              // console.log(i);
              messageObj[result[i]] = result[i+1];
              messageObj[result[i+2]] = result[i+3];
              messageObj[result[i+4]] = result[i+5];
              messageObj[result[i+6]] = result[i+7];
              messageObj[result[i+8]] = result[i+9];
              messageObj[result[i+10]] = result[i+11];
              this.LogisticsMessage.push(messageObj)    //将数据存入数组中
              i += 12;
              
            }
            this.$store.commit('CartItemData',this.LogisticsMessage)    //将用户的个人信息存入vuex中
            console.log(result);
            console.log(this.LogisticsMessage);
          }
        })
    },

  },
  mounted() {
    //接收来自加入购物车的信息
    
    this.$bus.$on('addCart',(msg1,msg2,msg3,msg4) => {
       console.log(msg1,msg2,msg3,msg4);//打印接收信息并输出显示
       const cartMsg = {}  //注意这里一定要在里面定义对象，因为对象存储的是地址所以push的值否则全部一样
       cartMsg.GOODS_ID = msg1
       cartMsg.PRICE = msg2
       cartMsg.TITLE = msg3
       cartMsg.IMG_URL = msg4
       cartMsg.REPLACE_NUM = 1
       this.currentTotalPrice += parseFloat(cartMsg.PRICE.replace(/￥/g,''))//用正则表达式，当存在￥时清除掉
       if(this.$store.state.cartmsglength === 0){   //当购物车位空时，添加当前点击的传送过来的信息入数组
         this.cartmsgArr.push(cartMsg)
         insertcarts(msg1,msg2,msg3,msg4,this.$store.state.username,1)
       } 
       else {
        for(let i = 0;i < this.cartmsgArr.length; i++){  //进行遍历当前商品数组，如果发现有page的id相同的就不添加到数组中，只改变当前数组对象的数量
          if(this.cartmsgArr[i].GOODS_ID === msg1){
            this.currentTotalNum1++                       //记录重复个数
            this.currentRepeat = true                   //若有重复就将其设置为true，后面的if语句不执行
            let num = this.cartmsgArr[i].REPLACE_NUM++                    //有重复就将当前数组对象的数量num加一
            // alert(num)
            updatecarts(num+1,this.cartmsgArr[i].GOODS_ID,this.$store.state.username)    //每次更改数据库中重复个数
            
            break;
          }
        }
        if(!this.currentRepeat){
          this.cartmsgArr.push(cartMsg)  //将传入的信息添加到数组中
          this.currentTotalNum = this.cartmsgArr.length
          insertcarts(msg1,msg2,msg3,msg4,this.$store.state.username,this.currentRepeatNum)
          
        }
        this.currentRepeat = false     // 默认将重复设置为false
       }
       
      //  this.$store.commit('cartMsg',this.cartMsg)
      //  console.log(this.$store.state.cartmsg);
      this.$store.commit('cartMsg',this.cartmsgArr)    //更新vuex中的购物车信息

    })
    this.$bus.$on('addCart1',(msg1,msg2,msg3,msg4,msg5) => {
       console.log(msg1,msg2,msg3,msg4,msg5);//打印接收信息并输出显示
       const cartMsg = {}  //注意这里一定要在里面定义对象，因为对象存储的是地址所以push的值否则全部一样
       cartMsg.GOODS_ID = msg1
       cartMsg.PRICE = msg2
       cartMsg.TITLE = msg3
       cartMsg.IMG_URL = msg4
       this.currentRepeatNum = parseInt(msg5)
       cartMsg.REPLACE_NUM = this.currentRepeatNum
        this.currentTotalPrice += parseFloat(cartMsg.PRICE.replace(/￥/g,''))//用正则表达式，当存在￥时清除掉
       if(this.$store.state.cartmsg.length === 0){   //当购物车位空时，添加当前点击的传送过来的信息入数组
         this.cartmsgArr.push(cartMsg)
         insertcarts(msg1,msg2,msg3,msg4,this.$store.state.username,this.currentRepeatNum)
         console.log(this.currentRepeatNum);
       } 
       else {
        for(let i = 0;i < this.cartmsgArr.length; i++){  //进行遍历当前商品数组，如果发现有page的id相同的就不添加到数组中，只改变当前数组对象的数量
          if(this.cartmsgArr[i].GOODS_ID === msg1){
            this.currentTotalNum1 = this.cartmsgArr[i].REPLACE_NUM                       //记录重复个数
            this.currentRepeat = true                   //若有重复就将其设置为true，后面的if语句不执行
            let num = parseInt(this.cartmsgArr[i].REPLACE_NUM)+parseInt(msg5)                    //有重复就将当前数组对象的数量num加一
            // alert(num)
            updatecarts(num,this.cartmsgArr[i].GOODS_ID,this.$store.state.username)    //每次更改数据库中重复个数
            break;
          }
        }
        if(!this.currentRepeat){
          this.cartmsgArr.push(cartMsg)  //将传入的信息添加到数组中
          this.currentTotalNum = this.cartmsgArr.length
          insertcarts(msg1,msg2,msg3,msg4,this.$store.state.username,this.currentRepeatNum)
          
        }
        this.currentRepeat = false     // 默认将重复设置为false
       }
       
      //  this.$store.commit('cartMsg',this.cartMsg)
      //  console.log(this.$store.state.cartmsg);
      this.$store.commit('cartMsg',this.cartmsgArr)    //更新vuex中的购物车信息
    })

    

  },
  // watch: {
  //   '$store.state.cartmsg': {
  //     deep: true,
  //     immediate: true,
  //     handler(val) {
  //       this.getcartsTest()
  //     }
  //   }
  // }
  
  
}
</script>

<style>
  .cart-frame {
    position: relative;
    float: left;
    width: 290px;
    height: 80px;
    margin-top: 5px;
    border-bottom: 1px solid darkgrey;
  }
  .cart-img {
    cursor: pointer;
  }
  .cart-img ,.cart-message{
    position: relative;
    font-size: 15px;
    float: left;
    margin-left: 10px;
    margin-top: 15px;
  }
  .cart-message .cart-title ,.cart-price ,.cart-cancel ,.cart-repeatNum{
    color: cornflowerblue;
    position: absolute;
    width: 180px;
    height: 20px;
    left: 0px;
    text-align: left;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    cursor: pointer;
  }
  .cart-message .cart-price {
    color: crimson;
    position: absolute;
    top: 30px;
    font-size: 13px;
  }
  .cart-repeatNum {
    top: 30px;
    left: 70px;
    font-size: 10px;
  }
  .cart-cancel {
    left: 250px;
    height: 30px;
    top: 25px;
    color: rgba(128, 128, 128, 0.555);
  }
  .cart-cancel:hover {
    color: cornflowerblue
  }
  .cart-empty{
    position: relative;
    float: left;
    width: 280px;
    height: 200px;
    text-align: center;
    margin-top: 150px;
  }
  .cart-empty-img {
    color: darkgray;
    font-size: 50px;
  }
  .cart-empty-font {
    margin-top: 50px;
    color: rgb(248, 160, 175);
    font-size: 20px;
  }
  

</style>