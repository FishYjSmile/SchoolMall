<template >
<!-- 用于实现异步url请求   待解决 -->
  <div id="goods-details" >
    <div class="details">
      <div class="details-left">
        <div class="details-img">
            <!-- {{item.img.mayjor}} -->
            <!-- {{details[currentnum].img.mayjor}} -->

          <!-- 使用图片懒加载 -->
            <img v-lazy="item.IMG_URL" alt="" width="350px" height="350px" v-for="(item,index) in details" :key="index" v-show="index === imgcurrent">
           
           
            <!-- <img :src="item" alt="" width="550px" height="350px" v-for="(item,index) in details.img.vmajor" :key="index" v-show="index === imgcurrent"> -->
            <!-- 这里进行判断当当前遍历到到的小图等于大图时显示大图 -->
            <!-- {{item.img.mayjor}} -->
            <!-- {{currentnum}} -->
          <!-- {{this.$route.query.message}}  获取url信息 -->
        </div>
        <div class="details-littleImg">
          <div class="littleImg-list" v-for="(item,index) in details" :key="index" @mouseover="showDetailsImg(index)">
            <!-- 监听具体鼠标移动到了那个 -->
            <img v-lazy="item.IMG_URL" alt="" width="89px" height="95px">
            <!-- <img :src="item" alt="" width="89px" height="95px"> -->
          </div>
        </div>
      </div>
      <div class="details-right">
        <div class="details-message-title">
          <div class="message-title-frame">
            {{details2.TITLE}}
          </div>
        </div>
        <div class="details-message-subtitle">
          <p class="message-subtitle-frame">{{details2.V_TITLE}}</p>
          <p class="details-price">￥{{details2.PRICE}}</p>
          
        </div>
        <div class="details-message-buttom">
          <div class="message-buttom-addsub">
          
            <span>数量</span>
            <div class="buttom-add" @click="goodsnumAdd" :class="{'buttomlimit':isshow || Goodsnum === 100}">+</div>
            <span class="buttom-number">{{Goodsnum}}</span>
            <div class="buttom-sub" @click="goodsnumSub" :class="{'buttomlimit':isshow1 || !Goodsnum}">-</div>
          </div>
          <div class="message-buttom-buttoms">
            <div class="message-left" @click="addCart1($route.query.ID,details2.PRICE,details2.TITLE,details2.IMG_URL,Goodsnum)">
              <!-- 发送当前数据里的信息(通过事件总线发送img,price,title) -->
              加入购物车
            </div>
            <div v-if="isshow2" class="message-left message-left1" @click="CheckCart()">
              <!-- 发送当前数据里的信息(通过事件总线发送img,price,title) -->
              查看购物车
            </div>
            <div class="message-right">
              立即购买
            </div>
          </div>
        </div>
      </div>
    </div>
    <Gdetails :details1="details1"></Gdetails>
    
  </div>
</template>

<script>
import Gdetails from './Gdetails'
import {SelectImgMayjor,SelectImgVMayjor,SelectDetailMayjor} from '../../network/details'   //获取信息
// import { Goods } from '../../../../08project/mall/src/network/detail'
export default {
  name:'Goodsdetails',
  components: {
    Gdetails,
  },
  data() {
    return {
      currentnum:0, //当前在第几个商品
      details:[],   //获取主图片
      details1:[],  //记录v图片
      details2:[],  //记录商品文字信息
      imgcurrent:0, //当前图片的url位置
      Goodsnum:1,    //当前商品的数量
      Goodslimit:false, //限制小于零,
      refresh:0,
      isshow:false,
      isshow1:true,
      isshow2:false,
      fresh:true,
    }
  },
  created() {

    this.SelectImgVMayjorTest()   
    this.SelectImgMayjorTest()   
    this.SelectDetailMayjorTest()
    // console.log(typeof this.$route.query.message);
    this.refresh = this.$store.state.refresh
    
  },
  watch: {
    '$store.state.cartmsg': {
      deep: true,
      immediate: true,
      handler(val) {
        if(this.$store.state.cartmsg) {
          for (let index = 0; index < this.$store.state.cartmsg.length; index++) {
            if(this.$store.state.cartmsg[index].GOODS_ID == this.$route.query.ID)
              this.isshow2 = true
            }
        }
      }
    }
  },
  methods: {
    SelectImgMayjorTest() {
      this.currentnum = this.$route.query.ID
      SelectImgMayjor(this.currentnum).then(res => {    //获取details数据
        this.details = res.data
        // console.log(res);
        
      })
    },
    SelectImgVMayjorTest() {
      this.currentnum = this.$route.query.ID
      SelectImgVMayjor(this.currentnum).then(res => {    //获取details数据
        this.details1 = res.data
        // console.log(res);
      })
    },
    SelectDetailMayjorTest() {
      this.currentnum = this.$route.query.ID
      SelectDetailMayjor(this.currentnum).then(res => {    //获取details数据
        this.details2 = res.data[0]
        // console.log(res);
      })
    },
    
    showDetailsImg(index) {
      this.imgcurrent = index
    },
    goodsnumAdd() {
      if(this.Goodsnum >= 100) 
        this.isshow = true
      else {
        this.Goodsnum ++
        this.details2.REPLACE_NUM = this.Goodsnum
        this.isshow = false
        this.isshow1 = false
      }
      
    },
    goodsnumSub() {
      if(this.Goodsnum === 0) {
        this.isshow1 = true
      }else {
        this.Goodsnum--
        this.details2.REPLACE_NUM = this.Goodsnum
        this.isshow1 = false
      }
    },
    addCart1(msg1,msg2,msg3,msg4,msg5) {
      // console.log(msg1,msg2,msg3);
      if(this.$store.state.username) {
        this.$bus.$emit('addCart1',msg1,msg2,msg3,msg4,msg5)   
      }else {
        this.$router.replace('/User/Login')
      }
      // 发送时间总线,并把信息传给Cart组件
    },
    // AddCart() {
    //   if(this.$store.state.username) {
    //     this.$store.commit('fresh')
    //     if(this.$store.state.cartmsg.length != 0) {
    //       for (let index = 0; index < this.$store.state.cartmsg.length; index++) {
    //         if(this.$store.state.cartmsg[index].GOODS_ID != this.$route.query.ID) {
    //           let obj = this.details2
    //           obj.REPLACE_NUM = this.Goodsnum
    //           this.$store.commit('cartMsgPush',obj)
    //           break
    //         }else if((this.$store.state.cartmsg[index].GOODS_ID == this.$route.query.ID)) {
    //           let num = parseInt(this.$store.state.cartmsg[index].REPLACE_NUM) + this.Goodsnum
    //           this.$store.cartmsg[index].REPLACE_NUM = num
    //           break
    //         }
    //       }
    //       this.isshow2 = true
    //     }else {
    //       let obj = this.details2
    //       obj.REPLACE_NUM = this.Goodsnum
    //       this.$store.commit('cartMsgPush',obj)
    //       this.isshow2 = true
    //     }
    //   }else {
    //     this.$router.replace('/User/Login')
    //   }
      
    // },
    CheckCart() {
      if(this.$store.state.username) {
        this.$router.replace('/Cart')
      }
    }
    

  }
}
</script>

<style>
  #goods-details {
    width: 1200px;
    margin: 0 auto;
  }
  .details {
    width: 1200px;
    height: 600px;
    margin: 0 auto;
    margin-top: 50px;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    margin-bottom: 50px;
    padding: 20px;
  }
  .details-left {
    width: 650px;
    height: 560px;
    /* background-color: blue; */
    float: left;
    position: relative;

  }
  
  .details-img {
    position: absolute;
    width: 600px;
    height: 450px;
    left: 25px;
    padding: 20px;
    
  }
  .details-img img {
    position: absolute;
    left: 120px;
    top: 50px;
  }
  .details-littleImg {
    width: 600px;
    height: 100px;
    position: relative;
    margin: 0 auto;
    margin-top: 450px;
    /* overflow: hidden; */
  }
  .littleImg-list {
    width: 95px;
    height: 100px;
    margin: 0 auto;
    margin-left: 3px;
    float: left;
    border:  3px solid rgba(0,0,0,.2);
    padding: 10px;
    position: relative;
    transition: all .3s;
  }
  .littleImg-list:hover {
    margin-top: -10px;
    box-shadow: 5px 5px 30px #000;
    
  }
  .littleImg-list img{
    position: absolute;
    top: 0px;
    left: 0px;
  }

  .details-right {
    width: 500px;
    height: 560px;
    /* background-color: rgb(23, 228, 255); */
    float: left;
    position: relative;

  }
  .details-message-title {
    width: 500px;
    height: 100px;
    /* background-color: darkgoldenrod; */
    padding: 50px;
    font-size: 25px;
    line-height: 4px;
    position: relative;
  }
  .message-title-frame {
    width: 412px;
    height: 40px;
    /* background-color: darkslategray; */
    position: absolute;
    left: 30px;
    top: 30px;
    line-height: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .details-message-subtitle {
     width: 500px;
    height: 100px;
    /* background-color: rgb(78, 56, 1); */
    padding: 50px;
    font-size: 20px;
    /* line-height: 0px; */
    position: relative;
    border-bottom: 1px solid #dcdcdc;
  }
  .message-subtitle-frame {
    width: 263px;
    height: 20px;
    /* background-color: #fff; */
    position: absolute;
    top: 45px;
    left: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .details-price {
    position: absolute;
    right: 60px;
    color: coral;
    top: 36px;
    font-size: 36px;
  }
  .details-message-buttom {
    width: 500px;
    height: 360px;
    /* background-color: hotpink; */
    
  }
  .buttom-number {
    position: absolute;
    right: 166px;
    top: 0px;
  }
  .message-buttom-addsub {
    width: 500px;
    height: 100px;
    /* background-color: lightskyblue; */
    position: relative;
     border-bottom: 1px solid #dcdcdc;
  }
  .message-buttom-addsub span {
    margin-left: 138px;
    line-height: 105px;
  }
  .buttom-add {
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50px;
    position: absolute;
    top: 41px;
    left: 360px;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
  }
  .buttom-sub {
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50px;
    position: absolute;
    top: 41px;
    left: 270px;
    text-align: center;
    line-height: 18px;
    cursor: pointer;
  }
  .buttom-limit {
    position: absolute;
    width: 25px;
    height: 25px;
    background-color: #fff;
    border-radius: 25px;
    top: 37px;
    left: 265px;
    color: crimson;
    font-size: 25px;
    text-align: center;
  }
  .buttom-sub:hover, .buttom-add:hover{
    background-color: #dcdcdc;
    color: rgb(29, 29, 29);
  }
  .message-buttom-buttoms {
     width: 500px;
    height: 100px;
    /* background-color: darkviolet; */
    position: relative;
    font-size: 12px;
  }
  .message-left {
    width: 80px;
    height: 40px;
    background-color: #678ee7;
    margin-left: 113px;
    float: left;
    margin-top: 30px;
    border-radius: 5px;
    position: absolute;
    line-height: 38px;
    text-align: center;
    border: 1px solid #5c81e3;
    color: #fff;
    background-image: linear-gradient(180deg,#678ee7,#5078df);
    cursor: pointer;
  }
  .message-left1 {
        background-image: linear-gradient(180deg, #ff9800 , #ff5722);
  }
  .message-left:hover {
    background-image: linear-gradient(180deg,#678ee7,#3957a3);
  }
  .message-right {
    width: 80px;
    height: 40px;
    margin-left: 301px;
    margin-top: 30px;
    border-radius: 5px;
    position: absolute;
    line-height: 38px;
    text-align: center;
    border: 1px solid #e1e1e1;
    color: #646464;
    background-color: #f9f9f9;
    background-image: linear-gradient(180deg,#fff,#f9f9f9);
    cursor: pointer;
  }
  .message-right:hover {
   background-image: linear-gradient(180deg,#fff,#c4c4c4);
  }
  .buttomlimit {
    background-color: #80808070;
    cursor: not-allowed;
    color: #fff;
  }
  .buttomlimit:hover {
    background-color: #80808070;
  }
  
</style>