<template>
  <div class="navigation">
    <div class="navigation-cover">
          <!-- 左 -->
      <div class="navigation-left">
        <div class="navigation-logo" @click="goHome">
          <a href="javascript:;"><div class="logo-set"></div></a>
        </div>
        
      </div>
      <!-- 中 -->
      <div class="navigation-center">
        <div class="navigation-search" >
          <input type="text" v-model="search" placeholder="请输入搜索内容" @click="searchinput" @keyup.enter="searchinput1">
          <!-- <div class="input-drop" v-show="isshow"></div> 下拉ajax暂时不做-->
          <button @click="searchinput2"><font-awesome-icon :icon="['fas', 'search']"></font-awesome-icon></button>
        </div>
        
      </div>
      <!-- 右 -->
      <div class="navigation-right">
        <div class="navigation-goods">
          <div class="all-goods" @click="goAllgoods">全部商品</div>
          <div class="all-goods">关于</div>
          <div class="goods-logo">
            <p>|</p>
            <div @mouseover="showLogin" @mouseout="outshowLogin">
              <div class="information" @click="jumpLogin"  ><a href="javascript:;"><font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon></a></div>
              <div v-if="$store.state.isLogin">
              <!-- 判断是否已经登陆 -->
                <!-- <div v-show="1" > -->
                <div v-show="isShowLogin" >
                  <div class="information-angle"></div>
                  <div class="information-login">
                    <div class="information-logo">
                      <div class="infromation-circleImg">
                        <img :src="$store.state.userimg" alt="" width="70px" height="100%">
                      </div>
                    </div>
                    <div class="information-name">
                      <p>{{$store.state.name}}</p>
                      <p>ID：{{$store.state.username}}</p>
                    </div>
                    <div v-for="(item,index) in showitem" :key="index" class="information-personal" @click="personal(index)" :class="{'information-personal1':index === $store.state.personItem}">
                      {{item}}
                    </div>
                    <div class="information-exit" @click="loginExit">
                      退出登陆
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            
            <div class="cart" @mouseover="showcart" @mouseleave="showcart1" @click="jumpCart"><el-badge  :value="$store.state.cartmsg.length" class="item"><a href="javascript:;"><font-awesome-icon :icon="['fas', 'shopping-cart']"></font-awesome-icon></a></el-badge>
              <div v-if="$store.state.isLogin">
                <div class="close-angle" v-show="isshowcart"></div>
                <div class="cart-list" v-show="isshowcart">
                <!-- <div class="cart-list" v-show="1"> -->
                <div class="cart-list-show">
                  <!-- 放购物车组件 -->
                  <Cart ref="CartPrice" :key="$store.state.isLogin"></Cart>
                </div>
                <div class="cart-show-price" v-if="TotalLength !== 0">
                  <!-- {{$refs.CartPrice.currentTotalPrice}} -->
                  <span class="cart-total-goods">共计：{{TotalNum}}件商品</span>
                  <span class="cart-total-price">
                      <span>合计：</span>
                      <span class="cart-total-font">￥{{TotalPrice}}</span>
                  </span>
                  <div class="cart-goto-accounts" @click="ToAccounts">
                    前去购物车
                  </div>
                </div>
              </div>
              </div>
              
            </div>
            <div class="email"><el-badge is-dot class="item"><a href="mailto:YuyuFishSmile@outlook.com"><font-awesome-icon :icon="['fas', 'envelope-open']"></font-awesome-icon></a></el-badge></div>
          </div>
          
        
        </div>
      </div>

    </div>
    
 
  </div>
</template>

<script>
import Cart from '../cart/Cart'
import {searchwholemessage} from '../../network/whole'
export default {
  name: 'Navigation',
  data() {
    return {
      isshow: false,
      showitem:['个人中心','订单管理','收货地址','我的优惠','售后服务','物流信息'],
      isshowcart: false,
      TotalPrice: 0,
      TotalNum:0,
      pathHome :'/home',
      pathWhole: '/whole',
      TotalLength: 0 ,
      isShowLogin: false,   //是否显示用户信息栏
      search:"",             //定义搜索输入框内容
    }
  },
  components: {
    Cart
  },
  methods: {
    searchinput() {
      this.isshow = !this.isshow
    },
    searchinput1() {
      this.searchwholemessageTest()
      this.$router.replace('/whole')
    },
    searchinput2() {
      this.searchwholemessageTest()
    },
    showcart() {
      this.isshowcart = true
    },
    showcart1() {
      this.isshowcart = false
    },
    goHome() {
      this.$store.commit('currentIndexChange',0)
      this.$router.replace(this.pathHome)
    },
    goAllgoods() {
      this.$store.commit('currentIndexChange',1)
      this.$router.replace(this.pathWhole)
    },
    jumpLogin() {
      if(this.$store.state.isLogin) {       //登陆后跳到用户中心
        this.$router.replace('/User/Personal')//填写登陆了之后点击可以跳转到个人中心
      }else
      this.$router.replace('/User/Login')   //未登陆时跳转到登陆页面
    },
    jumpCart() {
      if(this.$store.state.isLogin) {       //登陆后跳到购物中心
        //填写登陆了之后点击可以跳转到购物车中心
        this.$router.replace('/Cart')
      }else
      this.$router.replace('/User/Login')   //未登陆时跳转到登陆页面
      
    },
    showLogin() {                           //用于作用于登陆之后的用户显示
      if(this.$store.state.isLogin) {
        this.isShowLogin = true
      }
    },
    outshowLogin() {
      if(this.$store.state.isLogin) {
        this.isShowLogin = false
      }
    },
    loginExit() {                       //退出登陆
      if(this.$store.state.isLogin) {
        this.$store.commit('changeIslogin',false)
        // this.$router.replace('/home')
        this.$router.go(0)//强制页面刷新,清除vue中的缓存信息
      }
    },
    cartDataNew() {             //用于实时更新cart的内容
      
        this.TotalNum = this.$refs.CartPrice.currentTotalNum +this.$refs.CartPrice.currentTotalNum1
        this.TotalPrice = this.$refs.CartPrice.currentTotalPrice
        this.TotalLength = this.$store.state.cartmsg.length
      
        
 
    },
    personal(msg) {        //跳转到个人信息页面
      this.$store.commit('personItem',msg)
      this.$router.replace('/User/Personal')
    },
    ToAccounts() {      //跳转到购物车
      this.$router.replace('/Cart')
    },
    searchwholemessageTest() {      //获取搜索信息
      searchwholemessage(this.search).then(res => {
        if(res.status === 200) {
          console.log(res.data);
          this.$store.commit('WholeItem',res.data)

        }
      })
    }
  },
  // updated() {    //用于监听子组件中当前总价格的变化（要使用updated，用mounted和created监听不到）
  //   //  setTimeout(() => {
  //   //     this.TotalNum = this.$refs.CartPrice.currentTotalNum +this.$refs.CartPrice.currentTotalNum1
  //   //     this.TotalPrice = this.$refs.CartPrice.currentTotalPrice
  //   //     this.TotalLength = this.$refs.CartPrice.cartmsgArr.length
  //   // }, 100);
  //   // if(!this.$refs.CartPrice.currentTotalPrice)
  //   //   clearInterval(timer)
  //     //此无效报错      已解决(将setInterval改为setTimeout，setTimeout再调用自身函数实现循环)
  //     if(this.$store.state.username)
  //     this.cartDataNew()
  // },
  watch: {
    search(val) {
      // console.log( typeof val);
      if(!val)
      this.searchwholemessageTest()
    },
    '$store.state.cartmsg': {
      deep: true,
      immediate: true,
      handler(val) {
        this.cartDataNew()
        this.$refs.CartPrice.getcartsTest()
      }
    }
  }

}
</script>

<style scoped>
  .navigation {
    width: 100%;
    background-color: black;
    height: 100px;
  }
  .navigation-cover {
    width: 1200px;
    height: 100px;
    /* background-color: antiquewhite; */
    margin: 0 auto;
    display: block;
  }
  .navigation-left ,.navigation-right ,.navigation-center{
    /* flex: 1; */
    /* position: absolute; */
    width: 400px;
    background-color: #000;
    color: #fff;
    text-align: center;
    margin: 0 auto;
    display: block;
    float: left;
    height: 100px;
  }
  .navigation-search {
    /* display: flex; */
    width: 100%;
    height:100px;
    position: relative;
    
  }
  .navigation-logo {
    position: relative;
  }
  .logo-set {
    position: absolute;
    width: 50px;
    height: 50px;
    background-image: url('../../assets/img/logo/logo.png');
    background-size: cover;
    background-repeat: no-repeat;
    top: 20px;
  }
  .navigation-search input{
    font-size: 1px;
    width: 60%;
    height: 50px;
    padding-left: 10px;
    outline: none;
    height: 30px;
    border: 1px solid #e0e0e0;
    background-color: #fff;
    margin-top: 7px;
    color: #bfcbd9;
    margin-top: 35px;
    transition: all 0.3s;
  }
  .navigation-search input:hover {
    border: 1px solid #ff6700;
    color: #bfcbd9;
  }
  .navigation-search button {
    position: absolute;
    cursor: pointer;
    border: 0;
    background-color: #fff;
    right: 75px;
    top: 30px;
    margin-right: 5.8px;
    margin-top: 5.8px;
    height: 28.5px;
    flex-wrap: wrap;
    line-height: 20px;
    width: 30px;
    color: #616161;
    margin-left: 1px;
    transition: all 0.3s;
  }
  .navigation-search button:hover {
    color: #fff;
    background-color: #ff6700;
    border: 1px solid #ff6700;
  }
  .navigation-search .input-drop {
    position: absolute;
    width: 52.5%;
    height: 30px;
    background-color: #fff;
    left: 80px;
    top: 65px;
    border: 1px solid #ff6700;
  }
  .navigation-goods {
    width: 100%;
    height: 100%;
    display: block;
  }
  .navigation-goods .all-goods{
    line-height: 43px;
    width: 100px;
    height: 44px;
    margin: 0 auto;
    float: left;
    margin-top: 28px;
    color: #fff;
    cursor: pointer;
  }
  .navigation-goods .all-goods:hover{
    color: #ff6700;
    
  }
  
  .navigation-goods .goods-logo {
    display: block;
    float: left;
    width: 190px;
    height: 100%;
    position: relative;
  }
  .goods-logo p{
    position: absolute;
    color: rgb(10, 10, 9);
    left: 10px;
    top: 40px;
  }
  .goods-logo .information,.cart,.email{
    position: absolute;
    width: 40px;
    float: left;
    /* height: 100px; */
    top: 36px;
    font-size: 25px;

  }
  .goods-logo .information {
    left: 27px;
    height: 70px;
  }
  .goods-logo .cart {
    left: 70px;
  }
  .goods-logo .email {
    left: 110px;
  }
  .goods-logo a{
    color: #bfcbd994;
  }
  .goods-logo a:hover{
    color: #bfcbd9;
  }
  .cart .close-angle {
    position: absolute;
    width: 0;
    height: 0;
    border: 10px solid;
    border-color: transparent transparent #eef1f5;
    top: 20px;
    left: 10px;
  }
  .cart .cart-list {
    position: absolute;
    width: 300px;
    left: -230px;
    top: 40px;
    color: #000;
  }
 .cart-list-show {
    position: relative;
    width: 300px;
    height: 500px;
    background-color: rgb(248, 247, 247);
    color: #000;
    z-index: 15;
    overflow-y: scroll;
    overflow-x: none;
    text-align: center;
    border-radius: 8px;
  }
 .cart-list .cart-list-show::-webkit-scrollbar {
    width: 4px;
  }
 .cart-list .cart-list-show::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0,0,0,0.3);
  }
 .cart-list .cart-list-show::-webkit-scrollbar-track {
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }
  .information div {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background-color: #bfcbd9;
  }
  .cart-show-price {
    width: 300px;
    height: 80px;
    background-color: #ff6700;
    position: absolute;
    z-index: 15;
    /* bottom: 10px; */
    bottom: -57px;
    left: 0px;
     background-image: linear-gradient(rgb(249, 255, 196),rgb(162, 234, 247));
     float: left;
     font-size: 10px;
     border-radius: 8px;
     
  }
  .cart-show-price span{
    color: #616161;
    position: absolute;
    display: inline-block;
    left: 0px;
  }
  .cart-total-goods {
    top: 20px;
    margin-left: 30px;
    font-size: 13px;
  }
  .cart-total-font {
    top: 30px;
  }
  .cart-total-price {
    top: 45px;
    margin-left: 30px;
    width: 100px;
    height: 50px;
  }
  .cart-total-price span {
    top: 3px;
  }
  .cart-total-price .cart-total-font {
    /* position: absolute; */
    left: 40px;
    top: 0px;
    font-size: 20px;
    color: crimson;
  }
  .information-login {
    position: absolute;
    width: 150px;
    /* height: 285px; */
    top: 77px;
    left: -30px;
    z-index: 12;
    border-radius: 5px;
    overflow: hidden;
    /* background-color: #303030; */
    background-image: linear-gradient(to right, #ebbba7 0%, #cfc7f8 100%);
    box-shadow: 1px 1px 15px #303030;
  }
  .information-angle {
    position: absolute;
    width: 0;
    height: 0;
    border: 10px solid;
    border-color: transparent transparent #f7d2df;
    top: 57px;
    left: 37px;
    
  }
  .information-logo {
    width: 150px;
    height: 80px;
  }
  .information-name {
    position: relative;
    width: 150px;
    height: 50px;
    font-size: 15px;
    border-bottom: 1px solid #909090;
    color: #fff;
  }
  .information-name p{
    color: #fff;
  }
  .information-name p{
    float: left;
    top: 0px;
    position: relative;
    width: 150px;
    left: 0px;
    margin-top: 5px;
  }
  .information-personal {
    width: 150px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #909090;
    cursor: pointer;

  }
  .information-personal:hover {
    border-bottom: 1px solid #909090;
    background-color: #f4efef;
    color: #000;
  }
  .information-personal1{
    border-bottom: 1px solid #909090;
    background-color: #f4efef;
    color: #000;
  }
  .information-exit {
     width: 150px;
     height: 50px;
     line-height: 50px;
     border-bottom: 1px solid #909090;
     background-image: linear-gradient(to top, #a3bded 0%, #6991c7 100%);
     cursor: pointer;
  }
  .information-exit:hover {
    border-bottom: 1px solid #909090;
    background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%);
  }
  .infromation-circleImg {
    width: 70px;
    height: 70px;
    border-radius: 70px;
    line-height: 50px;
    margin: 0 auto;
    border: 1px solid #9e9e9e;
    margin-top: 5px;
    overflow: hidden;
  }
  .cart-goto-accounts {
    position: absolute;
    width: 80px;
    height: 40px;
    background-color: cornflowerblue;
    font-size: 10px;
    line-height: 40px;
    text-align: center;
    right: 20px;
    top: 20px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
  }
  .cart-goto-accounts:hover {
    background-color: rgb(90, 140, 235);
    color: rgb(218, 218, 218);
  }

  
</style>