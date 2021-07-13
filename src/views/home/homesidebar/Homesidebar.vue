<template>
  <div id="home-sidebar">
    <div class="sidebar-left">
      <div class="sidebar-kinds">
        <ul>
          <li v-for="(item,index) in sidebaritem" :key="index" @mouseover="sidebarmouseover(index)" @mouseout="sidebarmouseout">
            <p>{{item}}</p>
            <span><font-awesome-icon :icon="['fas', 'angle-right']"></font-awesome-icon></span></li>
        </ul>

      </div>
    </div>
    <div class="sidebar-right" v-show="this.$store.state.sidebarIshow">
      <div class="sidebar-goods">
        <Homesiderbaritems :sidebaiCurrentindex="sidebaiCurrentindex" :siderbaritems="siderbaritems"></Homesiderbaritems>
      </div>
    </div>
  </div>
</template>

<script>
import Homesiderbaritems from './Homesiderbaritems'
export default {
  name: 'Homesidebar',
  data() {
    return {
      sidebaritem:['手机','电脑','家用电器','闲置书籍','健身器材','自行车','男女服装','箱包','网络设备','动漫/周边'],
      // sidebarIshow :false,
      sidebaiCurrentindex: 0 
    }
  },
  props: {
    siderbaritems: {
      type:Array,
      default: []
      
    }
  },
  methods: {
    sidebarmouseover(index) {
      this.$store.commit('sidebarIshowmouseover')
      this.sidebaiCurrentindex = index  //将当前鼠标移上的块计数,传给子组件
    },
    sidebarmouseout() {
      this.$store.commit('sidebarIshowmouseout')
    }
  },
  components: {
    Homesiderbaritems
  }
}
</script>

<style>
  #home-sidebar {
    width: 235px;
    height: 675px;
    /* background-color: #; */
    position: absolute;
    z-index: 1;
    /* opacity: 0; */
  }
  .sidebar-left {
    width: 235px;
    height: 675px;
    background-color: rgba(105,101,101,.6);
    float: left;
    /* opacity: 0.2; */
  }
  .sidebar-kinds {
    width: 235px;
    height: 675px;
  }
  .sidebar-kinds ul li{
    width: 235px;
    height: 67.5px;
    color: #fff;
    text-align: left;
    font-size: 17px;
    line-height: 71px;
    position: relative;
    cursor: pointer;
  }
  .sidebar-kinds ul li:hover{
    background-image: linear-gradient(#F08080,#FF69B4);
    color: #98e0fc;
  }
  .sidebar-kinds ul li p{
    position: absolute;
    left: 30px;
  }
  .sidebar-kinds ul li span{
    position: absolute;
    right: 30px;
  }
  .sidebar-right {
    width: 965px;
    height: 675px;
    float: left;
    background-color: #fff;
    position: absolute;
    left: 235px;
    z-index: 2;
    /* opacity: 0.2; */
  }
  
</style>