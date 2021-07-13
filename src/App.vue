<template>
  <div id="app">
    <Navigation v-if="$store.state.isAnother"></Navigation>
    <Maintab v-if="$store.state.isAnother && $store.state.isNavbar"></Maintab>
    <keep-alive exclude="Goodsdetails,Login,CartItem">
    <!-- 使路由不会随意的创建和销毁 -->
     <router-view :key="$route.fullPath"/> 
     <!-- 给路由添加有个唯一的key这样可以实现在相同的url下，传的值不同页可以重新渲染页面 -->
    </keep-alive>
    
    <Footer v-if="$store.state.isAnother"></Footer>
  </div>
</template>

<script>
import Navigation from './components/navigation/Navigation'
import Maintab from './components/maintab/Maintab'
import Footer from './components/footer/Footer'


export default {
  name: 'App',
  components: {
    Maintab,
    Navigation,
    Footer
  }
}
</script>

<style>
@import "assets/css/base.css";
#app {
  /* background-color: blue; */
}
</style>
