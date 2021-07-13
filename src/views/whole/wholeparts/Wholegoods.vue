<template>
  <div id="whole-goods">
    <div class="goods-display" v-for="(item,index) in dataShow" :key="index" >
      <Wholeline :item="item"></Wholeline>
    </div>
    <div class="goods-end">
      <div class="goods-end-total">
        <p>共{{data.length*4}}条</p>
        <!-- {{typeof $route.query.pageSelect}} -->
        <div class="pageselectshow">
          <div class="pageselectmajor">
          </div>
          <ul>
            <li  class="pageselectab" v-for="(item1,index) in 4" :key="index"  @click="showmenu" v-if="index === pageSize-2">
              {{(index+1)*4+4}}条/页
              <span :class="{'pageselectabnew':isshowmenu}"><font-awesome-icon :icon="['fas', 'angle-down']"></font-awesome-icon></span>
             
            </li>
          </ul>
          <ul class="pageselectmenu" v-show="isshowmenu">
            <li class="pageselectabmenu" v-for="(item1,index) in 4" :key="index" @click="selectchangepage(index)" :class="{'pageselectpart':index ===pageSize-2}">{{(index+1)*4+4}}条/页</li>
          </ul>
        </div>
        <div class="total-select">
          <span class="total-left" @click="prePage()" :class="{'total-direction':currentleft}" ><font-awesome-icon :icon="['fas', 'angle-left']"></font-awesome-icon></span>
          <span class="total-center" v-for="(item,index) in pageNum" :key="index" :class="{'total-current':index === currentPage}" @click="currentPageChange(index)">{{index+1}}</span>
          <span class="total-right" @click="nextPage()" :class="{'total-direction':currentright}"><font-awesome-icon :icon="['fas', 'angle-right']"></font-awesome-icon></span>
        </div>
       
        
      </div>
    </div>
  </div>
</template>

<script>
import Wholeline from './Wholeline'
export default {
  name:'Wholegoods',
  components: {
    Wholeline
  },
  props: {
    wholemessage: {
      type:Array,
      default() {
        return []
      }
    }
  },
  
  watch: {
    // wholemessage(val) {  //将props里获取的值传给data数组
    //   this.data = val;
    //   this.pageNum = Math.ceil(this.data.length / this.pageSize) || 1;
    //   // console.log(this.data);
    //   for (let i = 0; i < this.pageNum; i++) {
    //     // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
    //     // 根据每页显示数量 将后台的数据分割到 每一页,假设pageSize为5， 则第一页是1-5条，即slice(0,5)，第二页是6-10条，即slice(5,10)...
    //     this.totalPage[i] = this.data.slice(this.pageSize * i, this.pageSize * (i + 1))
    //   }
    // // 获取到数据后显示第一页内容
    //   this.dataShow = this.totalPage[this.currentPage];
    // }



    wholemessage:{  //将props里获取的值传给data数组
      deep: true,
      immediate: true,
      handler (val) {
        // this.$store.commit('wholedata',val)
        this.data = val;
        this.pageNum = Math.ceil(this.data.length / this.pageSize) || 1;
        // console.log(this.data);
        for (let i = 0; i < this.pageNum; i++) {
          // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
          // 根据每页显示数量 将后台的数据分割到 每一页,假设pageSize为5， 则第一页是1-5条，即slice(0,5)，第二页是6-10条，即slice(5,10)...
          this.totalPage[i] = this.data.slice(this.pageSize * i, this.pageSize * (i + 1))
          console.log(this.totalPage[i]);
        }
      // 获取到数据后显示第一页内容
        this.dataShow = this.totalPage[this.currentPage];
      },
    },

  },
  data() {
    return {
      data: [],
      // 所有页面的数据
      totalPage: [],
      // 每页显示数量
      pageSize: 5,
      // 共几页
      pageNum: 1,
      // 当前显示的数据
      dataShow: "",
      // 默认当前显示第一页
      currentPage: 0,
      //左方向判断
      currentleft:false,
      //右方向判断
      currentright:false,
      //计算当前的显示格式
      pageselectchange:0,
      //显示某个模式
      pageselectmode:0,

      isshowmenu:false,

      currentmenu:0,
      
    }
  },
  methods: {
     // 上一页和下一页
    // 下一页
    nextPage() {
      if (this.currentPage === this.pageNum - 1){
        this.currentright = true;
        return ;
      } 
      this.dataShow = this.totalPage[++this.currentPage];
      this.currentright = false;
      this.currentleft= false;
    },
    // 上一页
    prePage() {
      if (this.currentPage === 0){
        this.currentleft= true;
        return ;
      } 
      this.dataShow = this.totalPage[--this.currentPage];
      this.currentleft= false;
      this.currentright = false;
    },
    currentPageChange(index) {
      this.currentPage = index
      this.dataShow = this.totalPage[index]
      this.currentleft= false;
      this.currentright = false;
    },
    selectchangepage(index) {
      this.pageSize = index+2
      this.currentmenu = index
      this.$router.push({path:'/whole',query:{pageSelect:this.pageSize}})  //通过传参数的形式来保存需要以什么模式来显示
      // location.reload ()
    },
    showmenu() {
      this.isshowmenu = !this.isshowmenu
    }
  },
  created() {
    if(this.$route.query.pageSelect)    //部位undefine时传，否则不传
      this.pageSize = this.$route.query.pageSelect      //创建时就给一个地址值传给需要改变的显示模式
  }
  
}
</script>

<style>
  #whole-goods {
    width: 1200px;
    /* background-color: rgb(115, 115, 241); */
    /* height: 2100px; */
    margin-bottom: 150px;
  }
  .goods-display {
    /* position: relative; */
    width: 1200px;
    height: 409px;
  }
  .goods-end {
    width: 1200px;
    height: 100px;
    background-color: rgba(128, 128, 128, 0.062);
    position: relative;
  }
  .goods-end-total {
    width: 500px;
    height: 100px;
    position: absolute;
    /* background-color: burlywood; */
    right: 0;
  }
  
  .total-left ,.total-right ,.total-center{
    width: 36px;
    height: 34px;
    display: inline-block;
    border: 1px solid #24242450;
    background-color: #fff;
    text-align: center;
    line-height: 33px;
    cursor: pointer;
  }
  .total-left:hover,.total-right:hover,.total-center:hover {
    color: coral
  }
  .total-direction{
    cursor: not-allowed;
  }
  .total-current {
    background-color: cornflowerblue;
    color: #fff;
  }
  .total-select {
    position: absolute;
    left: 265px;
    top: 39px;
  }
  .pageselectshow {
    width: 100px;
    height: 30px;
    /* background-color: rgb(35, 42, 133); */
    position: absolute;
    left: 125px;
    top: 35px;
  }
  .pageselectshow .pageselectab{
    list-style: none;
    text-align: center;
    width: 115px;
    height: 40px;
    line-height: 38px;
    /* background-color: aquamarine; */
     border: 1px solid gainsboro;
    background: #fff;
  }
  .pageselectshow .pageselectabmenu{
    list-style: none;
    text-align: center;
    width: 115px;
    height: 40px;
    line-height: 38px;
    /* background-color: aquamarine; */
    border: 1px solid gainsboro;
    background: #fff;
  }
  .goods-end-total p {
    position: absolute;
    left: 53px;
    top: 47px;
  }
  .pageselectmajor {
    position: absolute;
    width: 20px;
    height: 20px;
    /* background-color: crimson; */
    right: 0px;
    top: 0px;
    
  }
  .pageselectab {
    position: absolute;
    cursor: pointer;
    transition: all .5s;
  }
  .pageselectab span{
    position: absolute;
    width: 20px;
    height: 20px;
    /* background-color: crimson; */
    right: 2px;
    top: 10px;
    line-height: 20px;
    transition: all .5s;
  }
  .pageselectabnew{
    color: coral;
    transform: rotate(0.5turn);
  }
  .pageselectmenu {
    position: absolute;
    top: 35px;
    cursor: pointer;
    
  }
  .pageselectshow .pageselectpart {
    background-image: linear-gradient(#53acff, #44d4f8);
    color: #fff
  }
</style>