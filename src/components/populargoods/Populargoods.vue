<template>
  <div id="populargoods">
    <Populartimelimit :populargoods="populargoods"></Populartimelimit>
    <Popularitems :populargoods="populargoods" :items="items" :page=0></Popularitems>
    <Popularitems :populargoods="populargoods" :items="items" :page=1></Popularitems>
    <Popularitems :populargoods="populargoods" :items="items" :page=2></Popularitems>
    <Popularitems :populargoods="populargoods" :items="items" :page=3></Popularitems>
  </div>
</template>

<script>
import Popularitems from './Popularitems'
import Populartimelimit from './Populartimelimit'
export default {
  name:'Populargoods',
  data() {
    return {
      items:['热门商品','官方精选','品牌周边','品牌精选']
    }
  },
  props: {
    populargoods: {
      type:Array,
      default() {
        return []
      }
    }
  },
  methods: {
    
  },
  components: {
    Popularitems,
    Populartimelimit
  }
}
</script>

<style>
  
  
</style>