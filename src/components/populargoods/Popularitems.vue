<template>
<div>
  <div id="popular-items"  v-on="currentCount()">
    <div class="banner-popular">
      <div class="banner-fonts">
        {{items[page]}}
      </div>
    </div>
    <div class="items-majoy">
      <div v-if="populargoods[majoycurrentnum]!== undefined"> 
        <!-- 避免出现为undefined的情况报错 -->
         <img v-if="populargoods" v-lazy="populargoods[majoycurrentnum].IMG_URL" alt="" width="420px" height="420px" @click="JumpDetail(populargoods[majoycurrentnum].GOODS_ID)">
         <!-- <img v-if="populargoods" :src="populargoods[majoycurrentnum].url" alt="" width="584px" height="430px"> -->
      </div>
     
    </div>
    <div class="items-goods" v-for="(item,index) in populargoods.slice(currentnum,currentfirst)" :key="index" >
      <div class="items-border">
        <img v-lazy="item.IMG_URL" alt="" width="260px" height="260px" @click="JumpDetail(item.GOODS_ID)">
        <!-- <img :src="item.url" alt="" width="287px" height="430px"> -->
      </div>
      
    </div>
  </div>
</div>
</template>

<script>
export default {
  name:'Popularitems',
  props: {
    populargoods: {
      type:Array,
      default() {
        return []
      }
    },
    items: {
      type:Array,
      default() {
        return []
      }
    },
    page: {
      type:Number,
      default() {
        return 0
      }
    }
    
  },
  data() {
    return {
      currentnum:0,  //记录当前切片的起始位置
      currentfirst:0, //记录当前切片的终止位置
      majoycurrentnum:0
    }
  },
  methods: {
    currentCount() {     //当索引发生变化，改变切片位置
      console.log(this.page);
        switch (this.page) {
          case 0:
            this.currentnum = 0
            this.currentfirst = 6
            this.majoycurrentnum = 1
            break;
          case 1:
            this.currentnum = 6
            this.currentfirst = 12
            this.majoycurrentnum = 5
            break;
          case 2:
            this.currentnum = 12
            this.currentfirst = 18
            this.majoycurrentnum = 3
            break;
          case 3:
            this.currentnum = 18
            this.currentfirst = 24
            this.majoycurrentnum = 12
            break;
        }
        
    },
    JumpDetail(num) {
      this.$router.replace({path:'/details',query:{ID:num}})
    }
  }
}
</script>

<style scoped>
  #popular-items {
    width: 1200px;
    height: 956px;
    /* position: relative; */
    margin: 0 auto;
    margin-top: 40px;
    border: 1px solid #d4d4d4;
    border-radius: 9px 9px 9px 9px;
    overflow: hidden;
  }
  .banner-popular {
    width: 1200px;
    height: 60px;
    font-size: 20px;
    background: linear-gradient(#fbfbfb,#ececec);
    transition: all 0.5s;
  }
  .banner-popular:hover {
    background: linear-gradient(#fbfbfb,#dadada);
  }
   .banner-popular .banner-fonts {
    height: 60px;
    width: 100px;
    line-height: 58px;
    margin-left: 20px;
  }
  .items-majoy {
    width: 584px;
    height: 430px;
    float: left;
    transition: all 0.5s;
    margin-left: 10px;
    margin-top: 10px;
  }
  .items-majoy img{
    position: relative;
    top: 0px;
    left: 87px;
  }
  .items-majoy:hover {
    box-shadow: 10px 10px 50px rgb(0, 0, 0);
    margin-top: -5px;
  }
  .items-goods {
    width: 287px;
    height: 430px;
    float: left;
    position: relative;
    margin-left: 10px;
    margin-top: 10px;
  }
  .items-border {
    width: 287px;
    height: 430px;
    background-color: #fff;
    margin: 0 auto;
    transition: all 0.5s;
    cursor: pointer;
  }
  .items-border:hover {
    width: 287px;
    height: 430px;
    background-color: #fff;
    margin: 0 auto;
    margin-top: -10px;
    box-shadow: 10px 10px 50px rgb(0, 0, 0);
  }
  .items-border img{
    position: relative;
    top: 85px;
    left: 15px;
    text-align: center;
  }
  
</style>