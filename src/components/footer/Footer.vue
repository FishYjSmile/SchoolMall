<template>
  <div id="Footer">
    <div class="footer-frame">
      <div class="footer-items">
        <div class="items-left">
          <div class="items-left-font-flex" v-for="(item,index) in footermessage" :key="index">
            <div class="items-left-title">{{item.title}}</div>
            <ul class="items-design">
              <li class="items-design-li" v-for="(item,index) in item.items" :key="index">{{item}}</li>
            </ul>
          </div>
        </div>
       <div class="items-right">
         <div class="items-connection">
           <div class="right-img"><img src="../../../public/img/footer/hello.gif" width="150px" height="150px" alt=""></div>
           <div class="right-contact">个人博客：<a href="https://fishyjsmile.github.io/">https://fishyjsmile.github.io/</a></div>
           <div class="right-contact-font">
             <div class="right-other-contact" @mouseover="footeroverQR" @mouseout="footeroutQR"><font-awesome-icon :icon="['fas', 'air-freshener']"></font-awesome-icon></div>
             <div class="right-other-contact"><font-awesome-icon :icon="['fas', 'cat']"></font-awesome-icon></div>
             <div class="right-other-contact"><font-awesome-icon :icon="['fas', 'comment-dots']"></font-awesome-icon></div>
             <div class="right-other-contact"><font-awesome-icon :icon="['fas', 'crow']"></font-awesome-icon></div>
           </div>
           <span class="QR-Code"><img src="http://localhost:8081/img/footer/QR.png" alt="" width="150px" height="150px" v-show="footershowQr"></span>
         </div>
       </div>
      </div>
      <div class="footer-banner">
        <Footerbanner></Footerbanner>
      </div>
    </div>
    
  </div>
</template>

<script>
import Footerbanner from './Footerbanner'
import {getfooter} from '../../network/footer'
export default {
  name:'Footer',
  components: {
    Footerbanner
  },
  data() {
    return {
      footermessage:[],
      footershowQr:false
    }
  },
  created() {
    this.getfooter()
  },
  methods: {
    getfooter() {
      getfooter().then(res => {
        this.footermessage = res.data
        console.log(res);
      })
    },
    footeroverQR() {
      this.footershowQr = true
    },
    footeroutQR() {
      this.footershowQr = false
    }
  }
}
</script>

<style>
  #Footer {
    width: 100%;
    height: 600px;
    margin-top: 50px auto;
    border-top: 1px solid #e6e6e6;;
    background: #fafafa;
    float: left;
  }
  .footer-frame {
    width: 1200px;
    height: 600px;
    margin: 0 auto;
    
  }
  .footer-items {
    width: 1200px;
    height: 400px;
    /* background-color: aqua; */
  }
  .footer-banner {
    width: 1200px;
    height: 100px;
    /* background-color: blue; */
    border-top: 1px solid #e6e6e6;
  }
  .items-left {
    width: 750px;
    height: 400px;
    float: left;
    display: flex;
  }
  .items-left-font-flex {
    flex: 1;
    text-align: center;
    line-height: 176px;
  }
  .items-left-title {
    margin-top: 47px;
    font-size: 20px;

  }
  .items-left-title:hover {
    color: cornflowerblue;
  }
  .items-design {
    list-style: none;
    margin-top: -35px;
  }
  .items-design-li {
    line-height: 36px;
    font-size: 17px;
  }
  .items-design-li:hover {
    color: coral;
  }
  .items-right {
    width: 450px;
    height: 400px;
    /* background-color: rgb(90, 158, 63); */
    float: left;
  }
  .items-connection {
    position: relative;
  }
  .right-img {
    position: absolute;
    width: 150px;
    height: 150px;
    left: 25px;
    top: 55px;
  }
  .right-contact {
    width: 165px;
    height: 100px;
    position: absolute;
    right: 110px;
    top: 95px;
    font-size: 33px;
    text-align: center;
    line-height: 60px;
    
  }
  .right-contact a:hover {
    color: crimson;
  }
  .right-contact-font {
    width: 500px;
    height: 50px;
    position: absolute;
    left: 60px;
    top: 240px;
  }
  .right-other-contact {
    font-size: 36px;
    float: left;
    margin-left: 40px;
  }
  .right-other-contact:hover {
    color: rgb(252, 69, 197);
  }
  .QR-Code {
    position: absolute;
    left: 40px;
    top: 295px;
  }
</style>