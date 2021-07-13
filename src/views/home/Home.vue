<template>
  <div id="home">
    <Homeswiper :banner="banner" :siderbaritems="siderbaritems"></Homeswiper>
   
    <Recomend :recomend="recomend"></Recomend>
    <Populargoods :populargoods="populargoods"></Populargoods>
    
  </div>
</template>

<script>
import Homeswiper from './homeswiper/Homeswiper'
import Recomend from '../../components/recomend/Recomend'
import Populargoods from '../../components/populargoods/Populargoods'



import {getHomeMultidata,getHomeRecomend,getHomepopular,getHomesiderbar} from '../../network/home'
export default {
  name:'Home',
  components: {
    Homeswiper,
    Recomend,
    Populargoods,
    
  },
  data() {
    return {
      banner:[],
      recomend:[],
      populargoods:[],
      siderbaritems:[]
    }
  },
   created() {
    this.getHomeMultidata()
    this.getHomeRecomend()
    this.getHomepopular()
    this.getHomesiderbar()
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        if(res.status === 200){
            const result = res.data.split(/[,=]/)
            let i = 0
            for (let index = 0; index < (result.length-1)/4; index++) {
              const messageObj = {}
              // console.log(i);
              messageObj[result[i]] = result[i+1];
              messageObj[result[i+2]] = result[i+3];
              this.banner.push(messageObj)    //将数据存入数组中
              i += 4;
              
            }
            // console.log(result);
            // console.log(this.recomend);
        }
      })
    },
    getHomeRecomend() {
      getHomeRecomend().then(res => {
        // console.log(res);
        
        if(res.status === 200){
          const result = res.data.split(/[,=]/)
          let i = 0
          for (let index = 0; index < (result.length-1)/4; index++) {
            const messageObj = {}
            // console.log(i);
            messageObj[result[i]] = result[i+1];
            messageObj[result[i+2]] = result[i+3];
            this.recomend.push(messageObj)    //将数据存入数组中
            i += 4;
          }
          
          // console.log(result);
          // console.log(this.recomend);
        }
      })
    },
    getHomepopular() {
      getHomepopular().then(res => {
        if(res.status === 200){
          const result = res.data.split(/[,=]/)
          let i = 0
          for (let index = 0; index < (result.length-1)/4; index++) {
            const messageObj = {}
            // console.log(i);
            messageObj[result[i]] = result[i+1];
            messageObj[result[i+2]] = result[i+3];
            this.populargoods.push(messageObj)    //将数据存入数组中
            i += 4;
          }
          this.populargoods = this.shuffle(this.populargoods)
          
          // console.log(result);
          // console.log(this.populargoods);
        }
      })
    },
    getHomesiderbar() {   //用于存储siderbaritems
      getHomesiderbar().then(res => {
        this.siderbaritems = res.data
        // console.log(res.data);
      })
    },
    shuffle(arr) {    //洗牌算法随机打乱顺序
      let l = arr.length
      let index, temp
      while(l>0){
          index = Math.floor(Math.random()*l)
          temp = arr[l-1]
          arr[l-1] = arr[index]
          arr[index] = temp
          l-- 
      }
      return arr
    }
  },
  
}
</script>

<style scoped>
  #home {
    position: relative;
    
  }
</style>>

</style>