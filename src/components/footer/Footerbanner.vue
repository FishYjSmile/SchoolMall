<template>
  <div class="footer-copyright">
    <div class="copyright-left">
      Copyright@[2021] .Yj   All Rights Reserved. 
    </div>
    <div class="copyright-right">
      <span  @click="legalover()" >法律声明</span>
      <i>|</i>
      <span @click="concealover()" >隐私条款</span>
      <i>|</i>
      <span @click="developermodeover()">开发者名单</span>
    </div>
    <div class="copyright-legal" v-show="legalShow">
      <p>1111111111111111111111111111</p>
      <span></span>
    </div>
    <div class="copyright-conceal" v-show="concealShow">
      <p>2222222222222222222222222222222</p>
      <span></span>
    </div>
    <div class="copyright-developermode" v-show="developermodeShow">
      <p>333333333333333333333333333333</p>
      <span></span>
    </div>
    
  </div>
</template>

<script>
export default {
  name:'Footerbanner',
  data() {
    return {
      legalShow : false,
      concealShow : false,
      developermodeShow : false,
    }
  },
  methods: {
    legalover() {
      this.legalShow =  !this.legalShow
      this.concealShow = false
      this.developermodeShow = false
    },
    concealover() {
      this.concealShow =  !this.concealShow
      this.developermodeShow = false
      this.legalShow = false
    },
    developermodeover() {
      this.developermodeShow = !this.developermodeShow
      this.concealShow = false
      this.legalShow = false
    },
  }
}
</script>

<style>
  .footer-copyright {
    position: relative;
  }
  .copyright-left {
    position: absolute;
    left: 95px;
    top: 80px;
  }
  .copyright-right {
    position: absolute;
    right: 220px;
    top: 80px;
    
  }
  .copyright-right *{
    margin-left: 20px;
    color: cornflowerblue;
    cursor: pointer;
    
  }
  .copyright-right span:hover{
    color: rgb(38, 87, 248);
  }
  .copyright-legal {
    position: absolute;
    width: 200px;
    height: 100px;
    background-color: cornflowerblue;
    float: left;
    right: 472px;
    top:-34px;
    color: #fff;
    border-radius: 10px;
    
  }
  
  .copyright-conceal {
    position: absolute;
    width: 200px;
    height: 100px;
    background-color: darksalmon;
    float: left;
    right: 344px;
    top:-34px;
     color: #fff;
     border-radius: 10px;
  }
  .copyright-developermode {
    position: absolute;
    width: 200px;
    height: 100px;
    background-color: gold;
    float: left;
    right: 220px;
    top:-34px;
     color: #fff;
     border-radius: 10px;
  }
  .copyright-legal p ,.copyright-conceal p, .copyright-developermode p{
    line-height: 30px;
    
  }
  .copyright-legal span ,.copyright-conceal span, .copyright-developermode span{
    width: 0;
    height: 0;
    border: 10px solid;
    position: absolute;
    left: 165px;
    bottom: -18px;
    
  }
  .copyright-legal span  {
     border-color: cornflowerblue transparent transparent transparent;
  }
  .copyright-conceal span {
    border-color: darksalmon transparent transparent transparent;
  }
  .copyright-developermode span{
    border-color: gold transparent transparent transparent;
  }
</style>