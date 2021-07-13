<template>
  <div id="personalright">
    <div class="person-right-frame">
      <PersonalTitle v-for="(item,index) in item" :key="index" :item="item" :index="index" />
      <AccountInformation v-if="$store.state.personItem === 0" />
      <OrderManager v-if="$store.state.personItem === 1"/>
      <LogisticsInformation v-if="$store.state.personItem === 2"/>
      <CustomerPreferential v-if="$store.state.personItem === 3"/>
      <AfterService v-if="$store.state.personItem === 4"/>
      <ShippingAddress v-if="$store.state.personItem === 5"/>
      
    </div>
  </div>
</template>

<script>
import PersonalTitle from '../right/PersonalTitle'
import AccountInformation from '../right/personfunction/AccountInformation'
import AfterService from '../right/personfunction/AfterService'
import CustomerPreferential from '../right/personfunction/CustomerPreferential'
import LogisticsInformation from '../right/personfunction/LogisticsInformation'
import OrderManager from '../right/personfunction/OrderManager'
import ShippingAddress from '../right/personfunction/ShippingAddress'
export default {
  name:'PersonalRight',
  components: {
    PersonalTitle,
    AccountInformation,
    AfterService,
    CustomerPreferential,
    LogisticsInformation,
    OrderManager,
    ShippingAddress
  },
  props: {
    item: {
      type:Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      current:0
    }
  }
}
</script>

<style>
  #personalright {
    width: 1000px;
    height: 1000px;
    /* background-color: blanchedalmond; */
    padding: 20px 30px;
    float: left;
    
  }
  .person-right-frame {
    width: 100%;
    height: 800px;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    overflow: auto;
  }
</style>