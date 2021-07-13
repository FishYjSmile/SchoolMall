<template>
  <div id="mainbar" >
    
    <Tabbar1>
      <Tabbar></Tabbar>
    </Tabbar1>
    
  </div>
</template>

<script>

import Tabbar from '../../components/tabbar/Tabbar'
import Tabbar1 from '../../components/tabbar/Tabbar1'

export default {
  name:'Mainbar',
  data() {
    return {
      
    }
  },
  components: {
    Tabbar,
    Tabbar1
  },
  methods: {
    
  }
}
</script>

<style>
  #mainbar {
    position: sticky;
    top: 0px;
    z-index: 11;
  }
</style>