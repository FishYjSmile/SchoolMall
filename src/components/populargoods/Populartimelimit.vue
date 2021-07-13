<template>
  <div id="popular-time-limit">
    <div class="popular-time-banner">
      <div class="popular-time-font">
        <p>限时抢购</p>
      </div>
      <span class="time-left" @click="timeRollright()"><font-awesome-icon :icon="['fas', 'angle-left']"></font-awesome-icon></span>
      <span v-if="timeleftshow" class="time-left-limit"><font-awesome-icon :icon="['fas', 'angle-left']"></font-awesome-icon></span>
      <!-- 这里加上判断为真假时的v-show -->
      <span class="time-right" @click="timeRollleft()"><font-awesome-icon :icon="['fas', 'angle-right']"></font-awesome-icon></span>
      <span v-if="timerightshow" class="time-right-limit"><font-awesome-icon :icon="['fas', 'angle-right']"></font-awesome-icon></span>
      <!-- 这里加上判断为真假时的v-show -->
    </div>
    <div class="popular-time-majoy">
      <div class="popular-time" v-on="lastTime()">
        <p class="active-start-font">活动开始时间</p>
        <div class="active-time">
          {{activeHour + 1 + " : 00 : 00 "}}
        </div>
        <p class="active-current-font">当前时间</p>
        <div class="current-time">
          {{currentHour + " : " + currentMin + " : " +currentSec}}
        </div>
        <p class="active-remain-font">距离活动开始还剩</p>
        <div class="time-start-logo"><font-awesome-icon :icon="['fas', 'diagnoses']"></font-awesome-icon></div>
        <div class="active-current">
          <p class="active-Subhor">{{"0"+activeSubhor}}</p>
          <p class="colon-left">:</p>
          <p class="active-Submin">{{activeSubmin}}</p>
          <p class="colon-right">:</p>
          <p class="active-Subsec">{{activeSubsec}}</p>
        </div>
      </div>
      <div class="popular-time-items">
        <ul class="items-time-goods" :style="{'left':currentDistance+'px'}">
        <!-- <ul class="items-time-goods" v-on="timeRoll(index)" > -->
          <li v-for="(item,index) in populargoods" :key="index" v-on="timeCurrent(index)">
            <img :src="item.IMG_URL" alt="" height="220px" width="224.5px" @click="jumpdetail(item.GOODS_ID)">
          </li>
       
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Populartimelimit',
  created(){
    this.lastTime()
  },
  methods: {
    timeCurrent(index) {
      this.timenum = index  //用于记录当前json中有多少数据
    },
    // timeRoll() {
    //   setInterval(() => {
    //     this.currentDistance-=1000
    //     // console.log(this.currentDistance);
    //     if(this.timenum*250 +  this.currentDistance < 0){
    //       this.currentDistance = 0
    //     }
    //   },5000)
    // },
    timeRollleft() {
      if(this.currentDistance > this.timenum*-207){
        this.currentDistance -=998
        this.timerightshow = false
        this.timeleftshow = false
          //用于记录当前位置的偏移量与添加元素之间的差值用于判断边界
      }else {
        this.timerightshow = true
      }
        
      // console.log(this.currentDistance);
    },
    timeRollright() {
      if(this.currentDistance >= 0){
        this.currentDistance = 0
        this.timeleftshow = true
      }
      else{
        this.currentDistance +=998
        this.timeleftshow = false
        this.timerightshow = false
      }
      
    },
    lastTime() {
      setInterval(() => {
      const currentTimeSet = new Date();
      
      this.currentHour = currentTimeSet.getHours()
      this.currentMin = currentTimeSet.getMinutes()
      this.currentSec = currentTimeSet.getSeconds()
      this.millisecond = currentTimeSet.getTime()
      this.activeHour = this.currentHour
      this.activeSubhor = this.activeHour - this.currentHour
      this.activeSubmin = this.activeMin - this.currentMin
      this.activeSubsec = this.activeSec - this.currentSec
      }, 0);

      // setInterval(() => {
      // const currentTimeSet = new Date();
      // this.currentHour = currentTimeSet.getHours()
      // this.currentMin = currentTimeSet.getMinutes()
      // this.currentSec = currentTimeSet.getSeconds()
      // this.activeHour = this.currentHour + 2
      // }, 1000);
    },
    jumpdetail(num) {
      this.$router.replace({path:'/details',query:{ID:num}})
    }
  },
  data() {
    return {
      currentDistance: 0,
      timenum: 0,
      //当前时分秒    活动时分秒
      currentHour: 0,
      currentMin:0,
      currentSec:0,
      activeHour:0,
      activeMin:59,
      activeSec:60,
      activeSubmin:0,
      activeSubhor:0,
      activeSubsec:0,
      millisecond:0,
      timeleftshow:false,
      timerightshow:false
    }
  },
  props: {
    populargoods: {
      type:Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  #popular-time-limit {
    width: 1200px;
    height: 340px;
    margin: 0 auto;
    border-radius: 9px 9px 9px 9px;
    border: 1px solid #d4d4d4;
    background-color: #fff;
    margin-bottom: 100px;
  }
  .popular-time-banner {
    width: 1199.5px;
    height: 60px;
    font-size: 20px;
    background: linear-gradient(#fbfbfb,#ececec);
    margin: 0 auto;
    border-radius: 9px 9px 0px 0px;
    transition: all 0.5s;
    
    position: relative;
  }
  .popular-time-banner:hover {
     background: linear-gradient(#fbfbfb,#dadada);
  }
  .popular-time-font {
    height: 60px;
    width: 100px;
    line-height: 58px;
    margin-left: 20px;
  }
  .popular-time-banner .time-left,.time-left-limit {
    position: absolute;
    top: 20px;
    right: 100px;
    margin-left: 20px;
    width: 35px;
    height: 25px;
    cursor: pointer;
    text-align: center;
    line-height: 24px;
    border: 1px solid #24242450;
    background-color: #dadada86;
  }
  .popular-time-banner .time-left:hover {
    color: #ff6700;
  }
  .popular-time-banner .time-right,.time-right-limit {
    position: absolute;
    top: 20px;
    right: 50px;
    width: 35px;
    height: 25px;
    cursor: pointer;
    text-align: center;
    line-height: 24px;
    border: 1px solid #24242450;
    background-color: #dadada86;
  }
  .popular-time-banner .time-right:hover {
    color: #ff6700;
  }
  .time-left-limit,.time-right-limit {
    color: #fbfbfb;
    cursor: not-allowed;
  }
  .popular-time-majoy {
    height: 1200px;
    height: 280px;
  }
  .popular-time {
    height: 280px;
    width: 200px;
    /* background-color: #ff81988f; */
    background-image: linear-gradient(#e66465, #9198e5);
    float: left;
    color: white;
    position: relative;
  }
  .popular-time p{
    position: absolute;
  }
  .popular-time .active-time{
    height: 20px;
    width: 100px;
    position: absolute;
    color: #fff;
    left: 63px;
    top: 50px;
  }
  .popular-time .current-time{
    height: 20px;
    width: 130px;
    position: absolute;
    left: 46px;
    top: 250px;
    font-size: 20px;
  }
  .popular-time .active-current{
    height: 20px;
    width: 100px;
    position: absolute;
    left: 50px;
    bottom: 140px;
  }
  .active-current .active-Subhor,.active-Submin,.active-Subsec {
    width: 46px;
    height: 46px;
    background-color: #605751;
    top: 24px;
    text-align: center;
    font-size: 37px;
    line-height: 48px;
  }
  .active-current .active-Subhor {
    left: -42px;
  }
  .active-current .active-Submin {
    left: 25px;
  }
  .active-current .active-Subsec {
    left: 94px;
  }
  .active-current .colon-left,.colon-right {
    font-size: 50px;
    position: absolute;
    top: 13px;
  }
  .active-current .colon-left {
    left: 8px;
  }
  .active-current .colon-right {
    left: 76px;
  }
  .popular-time-items {
    height: 280px;
    width: 990px;
    background-color: antiquewhite;
    float: left;
    overflow: hidden;
    position: relative;
  }
  .items-time-goods {
    width: 10000px;
    height: 280px;
    background-color: #fff;
    position: absolute;
    left: 0px;
    transition: all 1.5s;
  }
  .items-time-goods li{
    float: left;
    height: 280px;
    width: 224.5px;
    margin-left: 25px;
    border-top: 1px solid #ff6700;
    border-bottom: 1px solid #00bcd4;
    list-style: none;
    cursor: pointer;
    transition: all 0.5s;
  }
  .items-time-goods li:hover{
    box-shadow: 0px 10px 50px #9198e5;
    
  }
  .items-time-goods li img{
    position: relative;
    top: 30px;
  }
  .active-start-font {
    left: 67px;
    top: 32px;
    font-size: 10px;
  }
  .active-current-font {
    left: 65px;
    bottom: 38px;
  }
  .active-remain-font {
    left: 37px;
    top: 116px;
  }
  .time-start-logo {
    position: absolute;
    left: 79px;
    top: 76px;
    font-size: 32px;
    color: #cddc39;
  }
  .time-start-logo:hover {
    color: #6df0f5;
  }
  
</style>