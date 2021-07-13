<template>
  <div id="pop-up">
    <!-- 这里是弹窗 -->
    <div class="pop-bg-color">
      <div class="pop-up-frame">
        <div class="pop-up-item">
          <!-- 接下来放内容 -->
          <span class="pop-up-close" @click="$store.commit('Tooltip',false),$store.commit('Tooltip1',false)"><font-awesome-icon :icon="['fas', 'times']"></font-awesome-icon></span>
          <div class="pop-up-input">
            <div class="pop-up-input-1" v-for="(item,index) in PopItem" :key="index">
              <slot :name="index"></slot>

            </div>
            <div class="pop-up-bottom">
              <div  @click="UpdateLogistics()">
                <slot name="change"></slot>
              </div>
              <div @click="InsertLogistics()">
                <slot name="add"></slot>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {UpdateLogisticsTest,InsertLogisticsTest} from '../../network/logistics'
export default {
  props: {
    PopItem: {
      type:Array,
      default:[]
    },
    Current: {  
      type:Number,
      default:0
    },
    PopUpMessage: {
      type:Object,
      default:{}
    },
    ShowLocation:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    GoTop() {
      const gotop = document.getElementsByClassName("pop-bg-color")[0]
      gotop.style.height = (gotop.getBoundingClientRect().bottom + document.documentElement.scrollTop).toString() + "px"   //自动拉伸高度
      // gotop.style.top = -gotop.getBoundingClientRect().top.toString()+"px"          //到达顶部位置(距离窗口的距离)
      // alert(document.documentElement.scrollTop)   //监听当前距离顶部的距离
      // alert(gotop.getBoundingClientRect().top)     //监听距离窗口近距离
      gotop.style.top = -(document.documentElement.scrollTop + gotop.getBoundingClientRect().top).toString()+"px"   //到达顶部位置(距离页面顶部的距离)
      // gotop.style.top = -gotop1.getBoundingClientRect().top.toString()+"px"
      
    },
    UpdateLogistics() {
      
      UpdateLogisticsTest(this.PopUpMessage,this.$store.state.username,this.Current+1).then( res => {
        if(res.status === 200) {
          this.$message({
          message: '恭喜你，成功修改地址信息',
          type: 'success'
          });
          const obj = {}
          obj.USERNAME = this.$store.state.username
          obj.ID = this.Current+1
          obj.ADDRESS = this.PopUpMessage.ADDRESS
          obj.NAME = this.PopUpMessage.NAME
          obj.ZIP_CODE = this.PopUpMessage.ZIP_CODE
          obj.PHONE = this.PopUpMessage.PHONE
          // const obj = {msg1:this.Current,msg2:this.PopUpMessage}
          this.$store.commit('CartItemDataUpdate',[this.Current,obj])           //更改同步信息
          // this.$store.commit('Refresh',false)     //查询加载刷新购物车页面       BUG:未完成页面显示的实时更新
          
          // setTimeout(() => {
          //   this.$store.commit('Refresh',true)
          // }, 100);
          setTimeout(() => {
            this.$store.commit('Tooltip',false) //关闭提示框
          }, 500);
        }else {
          this.$message.error('您填入的信息有误，请重新填写');
        }
        
      }).catch(res => {
        this.$message.error('网络延迟,请刷新页面再次尝试');
      })   //更改信息
      
      
    },
    InsertLogistics() {
     if(this.$store.state.username) {
       InsertLogisticsTest(this.PopUpMessage,this.$store.state.username,this.$store.state.CartItemData[0].length).then(res => {
         if(res.status === 200) {
           this.$message({
           message: '恭喜你，成功添加地址信息',
           type: 'success'
           });
          const obj = {}
          obj.USERNAME = this.$store.state.username
          obj.ID = this.$store.state.CartItemData[this.$store.state.CartItemData.length-1].length+1
          obj.ADDRESS = this.PopUpMessage.ADDRESS
          obj.NAME = this.PopUpMessage.NAME
          obj.ZIP_CODE = this.PopUpMessage.ZIP_CODE
          obj.PHONE = this.PopUpMessage.PHONE
          // const obj = {msg1:this.Current,msg2:this.PopUpMessage}
          this.$store.commit('CartItemDataInsert',[obj])           //添加同步信息
          //  const Data = [2,2,2,2,2,2]
          //  this.$store.commit('CartItemData',Data)
          setTimeout(() => {
            this.$store.commit('Tooltip1',false) //关闭提示框
          }, 500);

         }
         else 
          this.$message.error('您填入的信息有误，请重新填写');
       }).catch(res => {
         this.$message.error('网络延迟,请刷新页面再次尝试');
       }) 
      //  this.PopUpMessage.USERNAME = this.$store.state.username
      // this.PopUpMessage.ID = this.$store.state.CartItemData[this.$store.state.CartItemData.length-1].length+1
      
     }
     
   }
  },
  mounted() {
    window.addEventListener('scroll',this.GoTop(),true)   //监听滚动事件
  },
  data() {
    return {
      
    }
  }
}
</script>

<style>
  #pop-up {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 10;
  }
  .pop-bg-color {
    position: absolute;
    width: 1200px;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.3);
    height: 1000px;
    display: flex;
  }
  .pop-up-frame {
    width: 1200px;
    height: 600px;
    /* background-color: brown; */

    position: absolute;
    top: 10%;
    flex: 1;
    padding: 50px;
  }
  .pop-up-item {
    margin: 0 auto;
    width: 500px;
    height: 500px;
    background-color: #fff;
    margin-top: 100px;
    position: relative;
  }
  .pop-up-close {
    width: 40px;
    height: 40px;
    color: #9e9e9e99;
    position: relative;
    position: absolute;
    right: 0px;
    top: 7px;
    text-align: center;
    font-size: 30px;
    cursor: pointer;
    transition: all 1s;
    display: inline-block;
  }
  .pop-up-close:hover {
    transform: rotate(0.5turn);
    transform-origin: center;
    top: -2px;
  }
  .pop-up-input {
    width: 100%;
    height: 100%;
    padding: 50px;
    overflow: hidden;
  }
  .pop-up-input-1 {
    width: 100%;
    height: 50px;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid #03a9f4;
  }
  .pop-up-input-2{
    width: 100%;
    height: 100%;
    border: none;
    text-indent: 10px;
  }
  .pop-up-input-2:focus{
    outline-color: red;
  }
  .pop-up-bottom {
    width: 100px;
    height: 50px;
    background-color: #2abafd;
    margin-top: 50px;
    margin: 20px auto;
    border-radius: 10px;
    color: #fff;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
  }
  .pop-up-bottom:hover {
    box-shadow: 1px 1px 6px gray;
    background-color: #03a9f4;
    
    border-radius: 10px;
    color: #fff;
    
  }
</style>