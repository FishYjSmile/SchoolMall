<template >
  <div id="personal-title" v-if="index === $store.state.personItem">
    <span>{{item}}</span>
  </div>
</template>

<script>
export default {
  name:'PersonTitle',
  props: {
    item: {
      type:String,
      default() {
        return ""
      }
    },
    index: {
      type:Number,
      default() {
        return 0
      }
    }
  },
}
</script>

<style>
  #personal-title {
     width: 100%;
     height: 50px;
     background-color: #3030301c;
     box-shadow: 1px 0px 4px #000;
     font-size: 23px;
     /* cursor: pointer; */
     line-height: 50px;
     /* left: 10px; */
  }
  #personal-title:hover {
     width: 100%;
     height: 50px;
     background-color: #9e9e9e69;
     box-shadow: 1px 0px 4px #000;
     font-size: 23px;
     color: #fff;
  }
  #personal-title span {
    position: relative;
    left: 24px;
  }
</style>