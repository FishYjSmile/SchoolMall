<template>
  <div id="register" ref="Register">
    <Remind v-if="display" :displayMessage="displayMessage"></Remind>
    <div class="register-frame">
      <div class="register-frame-center">
        <div class="frame-top">
          <div class="frame-top-logo">
            <img src="../../assets/img/logo/logo14.png" alt="" width="80px">
            <p>欢迎来到本登陆系统</p>
          </div>
        </div>
        <div class="frame-center">
          <div class="input-border-account" :class="{activeBorder1:isShow1}" >
             <input class="input-account" type="text" placeholder="请输入您的新账号" @focus="changeBorder1" v-model="RegisterForm.username">
          </div>
          <div class="input-border-password" :class="{activeBorder1:isShow2}">
            <input class="input-password" type="text" placeholder="请输入您的新密码" @focus="changeBorder2" v-model="RegisterForm.password">
          </div>
          <div class="input-border-repassword" :class="{activeBorder1:isShow3}">
            <input class="input-repassword" type="text" placeholder="请再次输入密码" @focus="changeBorder3" v-model="RegisterForm.repassword">
          </div>
          <div class="input-border-name" :class="{activeBorder1:isShow4}">
            <input class="input-name" type="text" placeholder="请输入您的昵称" @focus="changeBorder4" v-model="RegisterForm.name">
          </div>
          <div class="input-register">
            <div class="input-remenber-checkbox">
               <label class="input-checkbox-laber" for="remenber">我已阅读并同意遵守<span>法律条款</span>和<span>隐私条款</span></label>
               <input class="input-checkbox" type="checkbox" name="11" id="remenber" v-model="RegisterForm.checkbox">
            </div>
          <div class="register-buttom-frame">
            <div class="register-buttom" :class="{activeRegister: isAllshow()}" @click="Register">
              注册
            </div>
          </div>
          <div class="register-buttom-reback">
            <div class="reback-buttom"   @click="rebackLogin">
              返回
            </div>
          </div>
            
          </div>
            
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Remind from '../../components/remind/Remind'
import {getRegister} from '../../network/register'   //传入来自后端的数据
export default {
  name:'Register',
  components: {
    Remind
  },
  data() {
    return {
      isShow1:false,
      isShow2:false,
      isShow3:false,
      isShow4:false,
       RegisterForm: {
        username: '',
        password: '',
        repassword: '',
        checkbox: '',
        name: ''
      },
      inputAll:false,
      display:false,
      displayMessage:null,
    }
  },
  methods: {
    changeBorder1() {
      this.isShow1 = true
      this.isShow2 = false
      this.isShow3 = false
      this.isShow4 = false
    },
    changeBorder2() {
      this.isShow2 = true
      this.isShow1 = false
      this.isShow3 = false
      this.isShow4 = false
    },
    changeBorder3() {
      this.isShow3 = true
      this.isShow1 = false
      this.isShow2 = false
      this.isShow4 = false
    },
    changeBorder4() {
      this.isShow4 = true
      this.isShow1 = false
      this.isShow2 = false
      this.isShow3 = false
    },
    changeBorderAll() {
      this.isShow2 = false
      this.isShow1 = false
    },
    rebackLogin() {
      // this.$store.commit('isAnother',true)
      this.$router.replace({path:'/User/Login'})

    },
    isAllshow() {
      if(this.RegisterForm.username&&this.RegisterForm.password&&this.RegisterForm.repassword&&this.RegisterForm.checkbox&&this.RegisterForm.name){
        this.inputAll = true
        return true
      }
      return false
    },
    Register() {
      if(this.inputAll){
        if(this.RegisterForm.password === this.RegisterForm.repassword){
          // this.$store.commit('isAnother',true)   //跳转到home页面前显示几个基础组件
          getRegister(this.RegisterForm.username,this.RegisterForm.password , this.RegisterForm.name).then(res => {
            if(res.status === 200){
              this.display = true
              setTimeout(() => {
                this.display = false
              }, 4000);
              this.displayMessage = "注册成功~~~"
              setTimeout(() => {
                this.rebackLogin()
              }, 2000);
              }
            else{
              this.display = true
              setTimeout(() => {
                this.display = false
              }, 4000);
              this.displayMessage = "请重新注册"
              }
          }).catch(res => {
            this.display = true
              setTimeout(() => {
                this.display = false
              }, 4000);
              this.displayMessage = "请重新注册"
          })
        }else{
           this.display = true
              setTimeout(() => {
                this.display = false
              }, 4000);
              this.displayMessage = "前后密码不一致"
        }
      }
    },
    changeimg() {
      let random = Math.round(Math.random()*14+1)
      let urlimg = "http://localhost:8081/img/login/"+random+".jpg"
      if(!this.$refs.Register.style)
      this.$router.go(0)
      this.$refs.Register.style.backgroundImage = 'url("'+urlimg+'")'
    }
  },
  created() {
    this.$store.commit('isAnother',false)   //跳转到register页面后移除其他几个基础组件
  },
  mounted() {
    this.changeimg()
    setInterval(() => {
      this.changeimg()
    }, 5000);
   
  },
  
}
</script>

<style>
  #register {
     width: 100%;
     height: 100%;
     background-repeat: no-repeat;
     background-size: cover;
     transition: all 1.5s;
  }
  .register-frame {
    width: 1200px;
    height: 51vw;
    /* background-color: antiquewhite; */
    margin: 0 auto;
    position: relative;
    opacity: 0.9;
  }
  .register-frame-center {
    position: relative;
    width: 400px;
    height: 570px;
    background-color: #fff;
    margin: 0 auto;
    top: 94px;
    box-shadow: 0px 1px 5px #000;
    border-radius: 10px;
  }
  .frame-top {
    width: 350px;
    height: 150px;
    /* background-color: aquamarine; */
    margin: 0 auto;
    text-align: center;
  }
  .frame-center {
    width: 350px;
    height: 340px;
    /* background-color: darkcyan; */
    margin: 0 auto;
    position: relative;
  }
  .input-border-account ,.input-border-password ,.input-border-repassword ,.input-border-name{
    position: absolute;
    width: 300px;
    height: 40px;
    border: 1px solid darkgrey;
    left: 27px;
     border-radius: 10px;
     overflow: hidden;
  }
  .input-border-account {
    top: 10px;
  }
  .input-border-password {
    top: 70px;
  }
  .input-border-repassword {
    top: 130px;
  }
  .input-border-name {
    top: 185px;
  }
  .input-account ,.input-password ,.input-repassword ,.input-name{
    list-style: none;
    border: none;
    outline: none;
    padding-left: 10px;
    width: 299px;
    height: 38px;
  }
  .frame-bottom {
    width: 350px;
    height: 150px;
    /* background-color: bisque; */
    margin: 0 auto;
    position: relative;
    bottom: -20px;
  }
  .input-register {
    position: absolute;
    width: 350px;
    height: 150px;
    /* background-color: darkgray; */
    bottom: -60px;
    border-bottom: 1px solid gray;
  }
  .input-remenber-checkbox {
    position: absolute;
    width: 300px;
    height: 20px;
    top: -12px;
    /* background-color: darkorange; */
    font-size: 10px;
    text-align: center;
  }
  .input-checkbox {
    position: absolute;
    left: 30px;
    top: 3px;
    width: 16px;
    height: 16px;
  }
  .input-checkbox-laber {
    position: absolute;
    left: 48px;
    top: 5px;
    font-size: 13px;
    widows: 300px;
  }
  .input-checkbox-laber span {
    color: blue;
    cursor: pointer;
  }
  .register-buttom-frame {
    position: absolute;
    bottom: 0px;
    left: 0px;
  }
  .register-buttom-reback {
    position: absolute;
    bottom: 0px;
    left: 0px;
  }
  .register-buttom {
    position: absolute;
    width: 300px;
    height: 50px;
    border-radius: 10px;
    top: -125px;
    left: 25px;
    text-align: center;
    line-height: 50px;
    font-size: 17px;
    background-color: rgb(160, 159, 159);
    color: #fff;
    cursor: not-allowed;
  }
  .reback-buttom {
    position: absolute;
    width: 300px;
    height: 50px;
    border-radius: 10px;
    top: -61px;
    left: 25px;
    text-align: center;
    line-height: 50px;
    font-size: 17px;
    background-color: #f44336;
    color: #fff;
    cursor: pointer;
  }
  .reback-buttom:hover {
    background-color: #fd6b61;
  }
 
  .activeBorder1 {
    border: 1px solid red;
  }
  .frame-top-logo {
    position: relative;
    width: 260px;
    height: 100px;
    margin: 0 auto;
    top: 30px;
  }
  .frame-top-logo p{
    position: relative;
    top: 22px;
    font-size: 20px;
  }
  .activeRegister {
    background-color: deepskyblue;
    box-shadow: 1px 1px 5px #000;
    cursor: pointer;
  }
</style>