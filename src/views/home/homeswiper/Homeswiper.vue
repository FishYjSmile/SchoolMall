<template>
  <div id="homeswiper">
    <div v-if="siderbaritems != undefined">
      <Swiper :siderbaritems="siderbaritems">
      <SwiperItem class="transition-img" v-for="(item,index) in banner" :key="index">
      <a href="javascript:;">
          <!-- <img v-lazy="item.url"> -->
          <img :src="item.IMG_URL" height="675px" @click="jumpdetail(item.GOODS_ID)">
      </a>
      
      </SwiperItem>
      </Swiper>
    </div>
    
  
  </div>
</template>

<script>
import {Swiper, SwiperItem} from '../../../components/swiper/index'

export default {
  name: 'Homeswiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banner: {
      type:Array,
      default() {
        return[]
      }
    },
    siderbaritems: {
      type:Array,
      default() {
        return []
      }
    }
  },
  methods: {
    jumpdetail(num) {
      this.$router.replace({path:'/details',query:{ID:num}})
    }
  }
}
</script>

<style>
 
</style>