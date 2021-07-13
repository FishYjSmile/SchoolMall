import Vue from 'vue'
import Router from 'vue-router'

// const Home = () => import('../views/Home/Home')
const Home = () => import('../views/home/Home')
const Whole = () => import('../views/whole/Whole')
const Other = () => import('../views/other/Other')
const Goodsdetails = () => import('../views/goodsdetail/Goodsdetails')
const Login = () => import('../views/user/Login')
const Register = () => import('../views/user/Register')
const Personal = () => import('../views/personal/Personal')
const Cart = () => import('../components/cart/CartItem')
const OrderMessage = () => import('../components/cart/CartMessage')
Vue.use(Router)
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name:'Home',
    component: Home
  },
  {
    path: '/whole',
    name: 'Whole',
    component: Whole
  },
  {
    path: '/other',
    name: 'Other',
    component: Other
  },
  {
    path: '/details',
    name: 'Goodsdetails',
    component: Goodsdetails
  },
  {
    path: '/User/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/User/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/User/Personal',
    name: 'Personal',
    component: Personal
  },
  {
    path: '/Cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/Cart/OrderMessage',
    name: 'OrderMessage',
    component: OrderMessage
  }
  
  
]
const router = new Router({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})
export default router
