import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    //存放状态信息
    sidebarIshow:false,
    currentIndex :null,
    cartmsg:[],
    refresh:0,
    isAnother: true,       //用于是否显示基础组件
    isNavbar:true,        //用于是否显示基础组件
    isLogin: false,      //判断是否登陆
    username:"",        //全局用户名
    password:"",       //全局密码
    name:"",          //全局姓名
    userimg:"",      //全局头像图片
    data:[],        //用于存放whole商品信息
    personItem:-1,    //用于person组件中的存放是哪一项功能
    cartTotalPrice:0,    //购物车总价格
    TotalNum:0,         //总商品数量
    CartItemData:[],       //显示地址信息
    Tooltip:false,     //用于表示当前是否显示选项卡
    Tooltip1:false,     //用于表示当前是否显示选项卡
    Refresh:true,      //刷新购物车
    Receive:{},         //收货信息
    OrderMessage:[],    //存放订单信息
    OrderNum:0,         //订单号
    OrderTime:"",        //订单时间
    CurrentOrder: [],      //存储当前订单的商品信息
    CurrentTotalPrice:0,      //存储当前订单的总价格
    CurrentTotalNum:0,      //存储当前订单的总数量
    OrderRefresh:0,          //更新当前的订单信息
    OrderNumMessage:[],      //存放所有订单的编号
    LogisticsCurrent:-1,        //默认地址当前选中的区域
    LogisticsDelete:false,     //是否删除地址
    WholeItem:[],             //存储所有的商品数据
    fresh:false,              //用于刷新判断
  },
  mutations: {
    //同步操作通过mutations修改的可以通过浏览器插件devtools进行跟踪
    // 更改store里的state一定通过mutations
    sidebarIshowmouseover(state) {
      state.sidebarIshow = true
    },
    sidebarIshowmouseout(state) {
      state.sidebarIshow = false
    },
    currentIndexChange(state,number) {
      state.currentIndex = number
    },
    cartMsg(state,msg) {
      state.cartmsg = msg
    },
    cartMsgPush(state,msg) {
      state.cartmsg.push(msg)
    },
    refreshNum(state,number) {
      state.refresh = number
    },
    isAnother(state,boolean) {
      state.isAnother = boolean
    },
    isNavbar(state,boolean) {
      state.isNavbar = boolean
    },
    changeLogin(state,obj) {   //只能传一个参数，可以传对象
      state.isLogin = obj.boolean
      state.name = obj.name
      state.username = obj.username
      state.password = obj.password
      state.userimg = obj.img
    },
    changeIslogin(state,boolean) {
      state.isLogin = boolean
    },
    wholedata(state,msg) {
      state.data = msg
    },
    personItem(state,msg) {
      state.personItem = msg
    },
    cartTotalPrice(state,msg) {
      state.cartTotalPrice = msg
    },
    CartItemData(state,msg) {
      state.CartItemData.push(msg)
    },
    CartItemDataUpdate(state,[msg1,msg2]) {
      state.CartItemData[0].splice(msg1,1,msg2)
    },
    CartItemDataInsert(state,[msg1]) {
      state.CartItemData[0].push(msg1)
    },
    CartItemDataDelete(state,[msg1]) {
      state.CartItemData[0].splice(msg1,1)
    },
    Tooltip(state,boolean) {
      state.Tooltip = boolean
    },
    Tooltip1(state,boolean) {
      state.Tooltip1 = boolean
    },
    Refresh(state,boolean) {
      state.Refresh = boolean
    },
    TotalNum(state,msg) {
      state.TotalNum = msg
    },
    Receive(state,obj) {
      state.Receive = obj
    },
    OrderMessage(state,msg) {
      state.OrderMessage = msg
    },
    OrderNumMessage(state,msg) {
      state.OrderNumMessage = msg
    },
    OrderNum(state,msg) {
      state.OrderNum = msg
    },
    OrderTime(state,msg) {
      state.OrderTime = msg
    },
    CurrentOrder(state,arr) {
      state.CurrentOrder = arr
    },
    CurrentTotalPrice(state,msg) {
      state.CurrentTotalPrice = msg
    },
    CurrentTotalNum(state,msg) {
      state.CurrentTotalNum = msg
    },
    OrderRefresh(state) {
      state.OrderRefresh++
    },
    LogisticsCurrent(state,msg) {
      state.LogisticsCurrent = msg
    },
    LogisticsDelete(state,boolean) {
      state.LogisticsDelete = boolean
    },
    WholeItem(state,arr) {
      state.WholeItem = arr
    },
    fresh(state) {
      state.fresh = !state.fresh
    },


    
  },
  actions: {
    //异步操作时要经过actions,修改state一定要在mutations中改
    refreshNumActions(context) {
        context.commit('refreshNum',1)
        
    }
  },
  getters: {
    //对state进行运算
    
  },
  modules: {
    
  }
})
export default store