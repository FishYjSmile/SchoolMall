<template>
  <div id="whole-line">
    <div v-if="item != undefined">
      <div class="whole-frame" v-for="(item,index) in item" :key="index">
        <Wholegoodsitem :item="item" ></Wholegoodsitem>
        <!-- 将值传递给子组件 -->
      </div>
    </div>
  </div>
</template>

<script>
import Wholegoodsitem from './Wholegoodsitem'
export default {
  name: 'Wholeline',
  components: {
    Wholegoodsitem
  },
  props: {
    item: {
      type:Array,
      default() {
        return []
      }
    }
  },
}
</script>

<style>
  #whole-line {
    width: 1200px;
    margin: 0 auto;
  }
  .whole-frame {
    width: 299.8px;
    height: 409px;
    /* background-color: bisque; */
    float: left;
    /* border: 1px solid red; */
    position: relative;
  }
</style>