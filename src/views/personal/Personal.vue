<template>
  <div id="personal">
    <PopUp v-if="$store.state.Tooltip || $store.state.Tooltip1" :PopItem="PopItem" :Current="Current" :PopUpMessage="PopUpMessage" :ShowLocation="ShowLocation">
    <template slot="0"><input type="text" class="pop-up-input-2" placeholder="收货人"  v-model="PopUpMessage.NAME"></template>
    <template slot="1"><input type="text" class="pop-up-input-2" placeholder="手机号" v-model="PopUpMessage.PHONE"></template>
    <template slot="2"><input type="text" class="pop-up-input-2" placeholder="收货地址" v-model="PopUpMessage.ADDRESS"></template>
    <template slot="3"><input type="text" class="pop-up-input-2" placeholder="邮政编码" v-model="PopUpMessage.ZIP_CODE"></template>
    <template slot="change" v-if="$store.state.Tooltip">确认修改</template>
    <template slot="add" v-if="$store.state.Tooltip1">确认添加</template>
    <!-- <template slot="change">确认添加</template> -->
  </PopUp>
    <PersonalLeft :item = "item"/>
    <PersonalRight :item = "item"/>
    

  </div>
</template>

<script>
import PersonalLeft from './left/PersonalLeft'
import PersonalRight from './right/PersonalRight'
import PopUp from '../../components/popup/PopUp'
import {DeleteLogisticsTest} from '../../network/logistics'
export default {
  name:'Personal',
  components: {
    PersonalLeft,
    PersonalRight,
    PopUp
  },
  data() {
    return {
      item:['账户资料','订单管理','收货地址','我的优惠','售后服务','物流信息'],
      PopItem:['收货人','手机号','收货地址','邮政编码'],
      PopUpMessage: {       //存放输入框信息
        PHONE:null,
        ADDRESS:null,
        NAME:null,
        ZIP_CODE:null,
        ID:null
      },
      Current:0,
      ShowLocation:false,
    }
  },
  watch: {
    '$store.state.LogisticsCurrent'(val){            //当点击修改将原本内容显示
        if(val!=-1){            //-1作为判断条件
          this.PopUpMessage.PHONE = this.$store.state.CartItemData[0][val].PHONE    
          this.PopUpMessage.ADDRESS = this.$store.state.CartItemData[0][val].ADDRESS
          this.PopUpMessage.NAME = this.$store.state.CartItemData[0][val].NAME
          this.PopUpMessage.ZIP_CODE = this.$store.state.CartItemData[0][val].ZIP_CODE
          this.PopUpMessage.ID = this.$store.state.CartItemData[0][val].ID
          this.Current = val
        // console.log(this.$store.state.CartItemData[0][val].PHONE);
        }
        if(this.$store.state.LogisticsDelete) {
          this.DeleteLogistics()
          this.$store.commit('LogisticsDelete',false)
        }
      },
      
   
  },
  created() {
    
  },
  beforeRouteEnter (to, from, next) {     //组件内的守卫
    next(vm => {                  //beforeRouteEnter中不可以使用this关键字，要用vm来代替this
      vm.$store.commit('isNavbar',false)
    })
  },
  beforeRouteLeave (to, from, next) {
	 // 导航离开该组件的对应路由时调用,可以使用this关键字
	 // 可以访问组件实例 `this`
   this.$store.commit('isNavbar',true)
   this.$store.commit('personItem',-1)
   next()
 },
 methods: {
   DeleteLogistics() {
     if(this.$store.state.CartItemData) {
       DeleteLogisticsTest(this.$store.state.username,this.PopUpMessage.ID)
       console.log(this.PopUpMessage.ID);
       this.$store.commit('CartItemDataDelete',[this.$store.state.LogisticsCurrent])
       
     }
     
   },
 }
}
</script>

<style>
  #personal {
    width: 1200px;
    margin: 0 auto;
  }
</style>