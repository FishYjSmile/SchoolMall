<template>
  <div id="g-details">
    <div class="g-details-top">
      <span>产品信息</span>
      <!-- {{details}} -->
    </div>
    <div class="g-details-buttom">
      <div v-for="(item,index) in details1" :key="index">
        <img v-lazy="item.IMG_URL" alt="" width="1200px">
        <!-- <img :src="item" alt="" width="1200px"> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Gdetails',
  props: {
    details1: {
      type:Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  #g-details {
    width: 1200px;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    background: linear-gradient(#fbfbfb,#ececec);
  }
  .g-details-top {
    width: 1197.5px;
    height: 50px;
    margin: 0 auto;
    border-radius: 8px 8px 0px 0px;
    background: linear-gradient(#fbfbfb,#ececec);
    position: relative;
    
  }
  .g-details-top:hover {
     background: linear-gradient(#fbfbfb,#b4b4b4);
     color: #000;
  }
  .g-details-top span {
    position: absolute;
    top: 15px;
    left:26px;
  }
  .g-details-buttom {
    width: 1197.5px;
    margin: 0 auto;
  }
</style>