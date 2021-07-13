<template>
  <div id="order-manager">
    <div class="Orders-remand" v-show="OrderMessage.length === 0">
      当前没有任何订单信息
    </div>
      <PersonalMode v-for="(item,index) in OrderNumMessage" :key="index" @mouseover.native="isshowmouseover(index)" @mouseout.native="isshowmouseout(index)">
        <template slot="left-one">{{item.TIME}}</template>
        <template slot="left-two">{{item.ORDER_NUM}}</template>
        <template slot="center-one">单价</template>
        <template slot="center-two">数量</template>
        <template slot="center-three">操作</template>
        <template slot="right-one">实付金额</template>
        <template slot="right-three">查看详细</template>
        <PersonalMode2 slot="Orders" v-for="(item1,index1) in OrderSortObj[item.ORDER_NUM]" :key="index1" >
          <template slot="left-one2"><img :src="item1.IMG_URL" alt="" width="68px" height="68px" style="position:relative;top:16px"></template>
          <template slot="left-two2">{{item1.TITLE}}</template>
          <template slot="center-one2">￥{{item1.PRICE}}</template>
          <template slot="center-two2">{{item1.REPLACE_NUM}}</template>
          <template slot="center-three2" v-if="index1 === 0">
            <transition name="fade" mode="out-in">
              <div class="Order-Delete" @click="deleteordersnumTest(item.ORDER_NUM,$store.state.username)" v-show="index === current">删除订单</div>
            </transition>
          </template>
          <template slot="right-one2" v-if="index1 === 0">￥{{item1.TotalPrice}}</template>
          <template slot="right-three2" v-if="index1 === 0">查看详细</template>
        </PersonalMode2>
      </PersonalMode>
      
  </div>
</template>

<script>
import PersonalMode from '../../../../components/personalitem/PersonalMode'
import PersonalMode2 from '../../../../components/personalitem/PersonalMode2'
import {getorders,getordersnum,deleteordersnum,deleteorders} from '../../../../network/orders'
export default {
  components: {
    PersonalMode,
    PersonalMode2
  },
  data() {
    return {
      RandomOrder:"",  //订单号
      CurrentTime:"",    //当前时间日期
      OrderMessage:[],    //存储当前用户的所有订单信息
      OrderNumMessage:[],    //存储当前用户的所有订单号
      OrderSortObj:{},        //通过订单编号作为属性保存每一个数组
      current:-1,
    }
  },
  watch: {
    '$store.state.OrderRefresh' : {
      handler() {
        this.getordersTest()
        this.getordersnumTest()
      },
      deep: true,
      immediate: true,        //使watch立刻先执行一遍
    }
  },
  methods: {
    getordersTest() {
      if(this.$store.state.username) {
        getorders(this.$store.state.username).then(res => {
        if(res.status === 200) {
          const result = res.data.split(/[,=]/)
          let i = 0
          let arr = []
          for (let index = 0; index < (result.length-1)/16; index++) {
            const messageObj = {}
            messageObj[result[i]] = result[i+1];
            messageObj[result[i+2]] = result[i+3];
            messageObj[result[i+4]] = result[i+5];
            messageObj[result[i+6]] = result[i+7];
            messageObj[result[i+8]] = result[i+9];
            messageObj[result[i+10]] = result[i+11];
            messageObj[result[i+12]] = result[i+13];
            messageObj[result[i+14]] = result[i+15];
            arr.push(messageObj)
            i += 16;
          }
          // console.log( this.OrderMessage);
          this.OrderMessage = arr
          arr = []
          this.OrderSort()
        }
        })
        
      }
      
      
    },
    getordersnumTest() {            //获取用户订单信息       
      if(this.$store.state.username){
        const obj = {}
        obj.USERNAME = this.$store.state.username
        getordersnum(obj).then(res => {
        if(res.status === 200) {
          const result = res.data.split(/[,=]/)
          let i = 0
          let arr = []
          for (let index = 0; index < (result.length-1)/6; index++) {
            const messageObj = {}
            messageObj[result[i]] = result[i+1];
            messageObj[result[i+2]] = result[i+3];
            messageObj[result[i+4]] = result[i+5];
            arr.push(messageObj)
            i += 6;
          }
          this.OrderNumMessage = arr
          arr = []
          this.OrderSort()
        }
        })
      }
      
    },
    OrderSort() {
      if(this.OrderMessage) {
       
        for (let index = 0; index < this.OrderNumMessage.length; index++) {
          let arr = []
           let TotalPrice = 0 //计算每个订单的总价格
          for(let index1 = 0; index1 < this.OrderMessage.length; index1++) {
            if(this.OrderNumMessage[index].ORDER_NUM === this.OrderMessage[index1].ORDER_NUM) {
              TotalPrice += parseFloat(this.OrderMessage[index1].PRICE)*parseInt(this.OrderMessage[index1].REPLACE_NUM)
              arr.push(this.OrderMessage[index1])
              // arr[index1][OrderTotalPrice] = 0    //将总金额作为数组存入arr
            }
          }
          if(TotalPrice)
          arr[0].TotalPrice = TotalPrice    //将总金额作为数组存入arr
          this.OrderSortObj[this.OrderNumMessage[index].ORDER_NUM] = arr    //以订单号作为对象属性
          
        }
      }
    },
    isshowmouseover(msg) {
      this.current = msg
    },
    isshowmouseout(msg) {
      this.current = -1  
    },
    deleteordersnumTest(msg1,msg2) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          const obj = {}
          obj.ORDER_NUM = msg1,
          obj.USERNAME = msg2
          deleteordersnum(obj)
          deleteorders(obj)
          this.getordersTest()    //更新订单
          this.getordersnumTest()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    }

  }
}
</script>

<style>
  .Orders-remand {
    width: 100%;
    height: 747px;
    background-color: #fff;
    line-height: 650px;
    text-align: center;
    font-size: 30px;
  }
  .Order-Delete {
    background: linear-gradient(to right, #a1c4fd 0%, #c2e9fb 100%);
    width:72px;
    height:45px;
    position:relative;
    top:28px;
    line-height:45px;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
    
  }
  .Order-Delete:hover {
    background-image: linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);

  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>