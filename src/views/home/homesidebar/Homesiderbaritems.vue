<template>
  <div id="home-siderbar-items" v-on="siderbarcurrent(sidebaiCurrentindex)" @mouseover="judgesiderbarover" @mouseout="judgesiderbarout">
    <!-- <h2>{{sidebaiCurrentindex}}</h2> -->
    <div class="sidebar-items" v-for="(item,index) in siderbaritems[siderItemsCurrent]" :key="index">
      <div class="siderbar-items-img">
        <!-- <img v-lazy="item.url" alt="" width="50px" height="50px"> -->
        <img :src="item.IMG_URL" alt="" width="70px" height="70px">
      </div>
      <div class="siderbar-items-font">
        {{item.TITLE}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Homesiderbaritems',
  props: {
    sidebaiCurrentindex: {  //获取当前的鼠标移动页面
      type:Number,
      default() {
        return 0
      }
    },
    siderbaritems: {        //获取数据
      type:Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      siderItemsCurrent:0
    }
    
  },
  methods: {
    siderbarcurrent(sidebaiCurrentindex) {
      this.siderItemsCurrent = sidebaiCurrentindex
      // console.log(this.siderItemsCurrent);
    },
    judgesiderbarover() {
      this.$store.commit('sidebarIshowmouseover')  //用于监听事务中的数据
    },
    judgesiderbarout() {
      this.$store.commit('sidebarIshowmouseout')
    }
  }
}
</script>

<style>
  #home-siderbar-items {
    width: 965px;
    height: 675px;
    margin: 0 auto;
    background-color: #fff;
    float: left;
    
  }
  #home-siderbar-items .sidebar-items{
    width: 228px;
    height: 100px;
    float: left;
    margin: 6.5px;
    position: relative;
  }
  .siderbar-items-img {
    position: absolute;
    left: 10px;
    top: 25px;
    cursor: pointer;
  }
  .siderbar-items-font {
    position: absolute; 
    right: 50px;
    text-align: center;
    top: 40px;
    font-size: 10px;
    cursor: pointer;
    line-height: 40px;
  }
  .siderbar-items-font:hover {
    color: coral;
  }
</style>