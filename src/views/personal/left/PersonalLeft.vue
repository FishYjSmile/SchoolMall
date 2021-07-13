<template>
  <div id="personalleft">
    <div class="person-frame">
      <img :src="$store.state.userimg" alt="" width="140px" height="140px">
      <h2>{{$store.state.name}}</h2>
      <h2>ID:{{$store.state.username}}</h2>
    </div>
    <ul class="person-item">
      <li v-for="(item,index) in item" :key="index" @click="isShowCurrent(index)" :class="{'person-current': $store.state.personItem === index}">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'PersonalLeft',
  data() {
    return {
      path:"",
    }
  },
  props: {
    item: {
      type:Array,
      default() {
        return []
      }
    }
  },
  methods: {
    isShowCurrent(num) {
      this.$store.commit('personItem',num)
    },
  }
}
</script>

<style>
  #personalleft {
    width: 200px;
    float: left;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e6e6e6;
    position: relative;
    top: 20px;
  }
  .person-frame {
    width: 100%;
    height: 300px;
    padding: 20px;
    text-align: center;
  }
  .person-item {
    width: 100%;
    list-style: none;
  }
  .person-item li{
    width: 100%;
    height: 65px;
    border-top: 1px solid #e6e6e6;
    text-align: center;
    line-height: 70px;
    font-size: 20px;
    transition: all 0.2s;
    cursor: pointer;
  }
  .person-item li:hover{
    background-color: cornflowerblue;
    color: #fff;
  }
  .person-current {
    background-color: cornflowerblue;
    color: #fff;
  }
</style>