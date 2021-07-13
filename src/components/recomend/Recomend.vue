<template>
  <div id="recomend">
    <div class="recomend-show" v-for="(item,index) in recomend" :key="index">
      <a href="javascript:;"><img v-lazy="item.IMG_URL" alt="" width="280px" height="200px"></a>
      <!-- <a href="javascript:;"><img :src="item.url" alt="" width="280px" height="200px"></a> -->
      
    </div>
    <!-- <button @click="show">111</button> -->
    
  </div>
  
</template>

<script>
export default {
  name:'Reconmend',
  props: {
    recomend: {
      type:Array,
      default() {
        return []
      }
    }
  },
  methods: {
    // show() {
    //   console.log(this.recomend);
    // },
  }
}
</script>

<style scoped>
  #recomend {
    width: 1200px;
    height: 300px;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 30px;
  }
  #recomend .recomend-show {
    width: 280px;
    height: 200px;
    float: left;
    cursor: pointer;
    margin-left: 16px;
    margin-top: 50px;
    filter: contrast(100%);
    transition: all 0.5s;
    box-shadow: 5px 5px 10px rgb(0, 0, 0);
  }
  #recomend .recomend-show:hover {
    filter: contrast(150%);
    margin-top: 30px;
  }
</style>