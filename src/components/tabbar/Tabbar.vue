<template>
  <div id="tabbar">
    <div class="tabbar-cover">
      <div class="tabbar-item">
        <div class="tabbar-logo" ></div>
        <ul>
          <li v-for="(item,index) in banner" :key="index" :class="{active:index === $store.state.currentIndex}" @click="itemClick(index),currentover(index)">{{item}}</li>
        </ul>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name:'Tabbar',
  data() {
    return {
      banner:['首页','全部','待开发','待开发','待开发','待开发','待开发','待开发','待开发'],
      // currentIndex: 0,
      path:['/home','/whole','/other','/other','/other','/other','/other','/other','/other'],
      currentpath: '/home'
    }
  },

  methods: {
    currentClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
      //将内部数据传到外部
    },
    currentover(index) {
      // this.currentIndex = index
      this.$emit('tabClick', index)
      //将内部数据传到外部
    },
    itemClick(index) {
      // console.log(this.$route);
      this.$store.commit('currentIndexChange',index)
      switch (index) {
        case 0:
          this.currentpath='/home'
          break;
        case 1:
          this.currentpath='/whole'
          break;
        default:
          this.currentpath='/other'
          break;
      }
      this.$router.replace(this.currentpath)
    }
  }
}
</script>

<style>
  #tabbar {
    height: 100px;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 0px 4px 4px aliceblue;
    

  }
  #tabbar .tabbar-cover {
    height: 100px;
    width: 1200px;
    background-color: #fff;
    margin: 0 auto;
    
  }
  .tabbar-item {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    
  }
  .tabbar-item .tabbar-logo {
    position: absolute;
    width: 90px;
    height:90px;
    background-image: url('../../assets/img/logo/logo15.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: -13px;
    top: 10px;
    
  }
  .tabbar-item ul {
    margin-left: 120px;
  }
  .tabbar-item ul li{
    height: 65px;
    display: block;
    float: left;
    margin-left: 40px;
    line-height: 95px;
    font-size: 20px;
    cursor: pointer;
  }
  .tabbar-item ul li:hover{
    color: #ff6700;
    border-bottom:2px solid #ff6700;
  }
  .active {
    border-bottom:2px solid #ff6700;
    color: coral;
    /* background-color: #ff6700; */
  }
</style>