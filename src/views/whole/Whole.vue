<template>
  <div id="whole">
    <Wholetop></Wholetop>
    <Wholegoods :wholemessage="wholemessage"></Wholegoods>
    <!-- 传值给子组件 -->
  </div>
</template>

<script>
import Wholetop from './wholeparts/Wholetop'
import Wholegoods from './wholeparts/Wholegoods'

import {getwholemessage} from '../../network/whole'
export default {
  name:'Whole',
  components: {
    Wholetop,
    Wholegoods
  },
  data() {
    return {
      wholemessage:[],
      itemmessage:[]
    }
  },
  created() {
    this.getwholemessage()
  },
  methods: {
    getwholemessage() {
      getwholemessage().then(res => {
        // console.log(res.data);
        // this.wholemessage = res.data
        // console.log(this.wholemessage);
        if(res.status === 200){
            const result = res.data.split(/[,=]/)
            // console.log(result);
            let i = 0
            for (let index = 0; index < (result.length-1)/10; index++) {
              const messageObj = {}
              // console.log(i);
              messageObj[result[i]] = result[i+1];
              messageObj[result[i+2]] = result[i+3];
              messageObj[result[i+4]] = result[i+5];
              messageObj[result[i+6]] = result[i+7];
              messageObj[result[i+8]] = result[i+9];
              this.itemmessage.push(messageObj)    //将数据存入数组中
              
              i += 10;
            }
            this.$store.commit('WholeItem',this.itemmessage)
            this.WholeMessage()
            
        }
      })
    },
    WholeMessage() {
      let j = 0
      let test = []    //用于作为中转的作用
      for (let index = 0; index < this.$store.state.WholeItem.length; index++) {  //判断将数据清洗，每四个为一组存入一个数组中
        if(index%4 === 0 && index!=0){
          for(let i = 0;i<test.length;i++){
            this.wholemessage[j] = test
          }
          j++
          // console.log(test);
          test = []
        }
        test.push(this.$store.state.WholeItem[index])
        if(index > this.$store.state.WholeItem.length-4){  //这里用来判断最后的3个或以下的个数不能添加到数组的情况
          this.wholemessage[j] = test
        }
      }
      // console.log(this.itemmessage);
      
      this.wholemessage = JSON.parse(JSON.stringify(this.wholemessage))    //数据无法正常显示的原因是（数据对象的 __ob__ 属性）只需要将其转换为json
    }
  },
  watch: {
    '$store.state.WholeItem': {
      handler(val) {
        this.wholemessage = []
        this.WholeMessage()
      },
      deep: true,
      immediate: true,
    }
  }
}
</script>

<style>
  #whole {
    width: 1200px;
    margin: 0 auto;
    /* background-color: #ededed; */
  }
</style>