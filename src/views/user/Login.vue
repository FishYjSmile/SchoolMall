<template>

  <div id="login" ref="login">
    <!-- <Remind v-if="display" :displayMessage="displayMessage"></Remind> -->
    <div class="login-frame">
      <div class="login-frame-center">
        <div class="frame-top">
          <div class="frame-top-logo">
            <img src="../../assets/img/logo/logo14.png" alt="" width="80px">
            <p>欢迎来到本登陆系统</p>
          </div>
        </div>
        <!-- <form ref="loginFormRef" :model="loginForm" :rules="loginFormRules"> -->
          
        <form action="">
          <div class="frame-center">
            <td>
            <div class="input-border-account" :class="{activeBorder1:isShow1}" >
              <input class="input-account" type="text" placeholder="账号" @focus="changeBorder1" v-model="loginForm.username">
            </div>
            </td>
            <div class="input-border-password" :class="{activeBorder1:isShow2}">
              <input class="input-password" type="text" placeholder="密码" @focus="changeBorder2" v-model="loginForm.password">
            </div>
            <div class="input-login">
              <div class="input-remenber-checkbox">
                <label class="input-checkbox-laber" for="remenber">记住密码</label>
                <input class="input-checkbox" type="checkbox" name="11" id="remenber">
              </div>
              <div class="login-register-font">
                <p class="register-a"><a href="/User/Register">注册新账号</a></p>
                <p>|</p>
                <p class="restart-a"><a href="javascript:;">忘记密码?</a></p>
              </div>
              <div class="login-buttom-frame">
                <!-- <div class="login-buttom" @click="login('loginFormRef')"> -->
                  <el-button type="primary" class="login-buttom"  @click="login('loginFormRef')">登陆</el-button>
                  <!-- 登陆 -->
                <!-- </div> -->
                <div class="reback-buttom" @click="rebackHome">
                  返回
                </div>
              </div>
            </div>
          </div>
        </form>
        <div class="frame-bottom">
          <div class="frame-bottom-other">
            <p>使用其他方式登陆:</p>
            <span><img src="../../../public/img/login/qq-brands.svg" alt="" width="13px"></span>
            <span><img src="../../../public/img/login/weixin-brands.svg" alt="" width="20px"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import qs from 'qs'
import Remind from '../../components/remind/Remind'
import {getLogin} from '../../network/login'   //传入来自后端的数据
export default {
  name:'Login',
  components: {
    Remind
  },
  data() {
    return {
      isShow1:false,
      isShow2:false,
      display:false,
      displayMessage:null,
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: '',
        // pwdType: "password",
      },
      msg: '',
      // loginFormRules: {
      //   username: [
      //     {required: true, message: '请输入登录账号', trigger: 'blur'},
      //     {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'},
      //   ],
      //   password: [
      //     {required: true, message: '请输入登陆密码', trigger: 'blur'},
      //     {min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur'},
      //   ]
      // }
    }
  },
  methods: {
    changeBorder1() {
      this.isShow1 = true
      this.isShow2 = false
    },
    changeBorder2() {
      this.isShow2 = true
      this.isShow1 = false
    },
    changeBorderAll() {
      this.isShow2 = false
      this.isShow1 = false
    },
    rebackHome() {
      this.$store.commit('isAnother',true)
      this.$router.replace({path:'/home'})

    },
    login() {
      if (!this.loginForm.username || !this.loginForm.password) {
        this.display = true
        setTimeout(() => {
          this.display = false
        }, 4000);
        // this.displayMessage = "账号或密码不能为空"
        this.$notify({
          title: '警告',
          message: '账号或密码不能为空',
          type: 'warning'
        });
      }else{
        getLogin(this.loginForm.username,this.loginForm.password).then(res =>{
          if (res.status === 200) {    //将后端传入的数据进行一次清洗
            console.log(res);
            if(res.data){
              const result = res.data.split(",")
              const messageObj = {}
              for(let i = 0;i<result.length;i++) {//将后端传入的数据进行二次清洗
                const message = result[i].split("=")
                messageObj[message[0]] = message[1]
              }
              console.log(messageObj);  //判断是否一致
              if((this.loginForm.username === messageObj.username) && (this.loginForm.password === messageObj.password)) {
                this.display = true
                setTimeout(() => {
                  this.display = false
                }, 4000);
                this.$notify({
                  title: '成功',
                  message: "欢迎回来:"+messageObj.name,
                  type: 'success'
                });
                console.log(messageObj.name);
                messageObj.boolean = true;
                this.$store.commit('changeLogin',messageObj)  //判断当前是登陆状态
                // this.$store.commit('changeLogin',true,messageObj.name,messageObj.password,messageObj.username)  //判断当前是登陆状态
                setTimeout(() => {
                  this.rebackHome()
                }, 2000);
              }else{
                // this.display = true
                // setTimeout(() => {
                //   this.display = false
                // }, 4000);
                // this.displayMessage = res.data
                this.$notify.error({
                title: '错误',
                message: '用户名或密码错误请重新输入'
              });
              }
              
            }else{
              // this.display = true
              // setTimeout(() => {
              //   this.display = false
              // }, 4000);
              // this.displayMessage = "用户名或密码错误请重新输入"
              this.$notify.error({
                title: '错误',
                message: '用户名或密码错误请重新输入'
              });
              }
          }
          else {
            // console.log(error);
            // this.display = true
            // setTimeout(() => {
            //   this.display = false
            // }, 4000);
            // this.displayMessage = "账号或密码错误请重新输入~~~"
            this.$notify.error({
                title: '错误',
                message: '用户名或密码错误请重新输入'
            });
          }
        })
      }
    },
    changeimg() {
      let random = Math.round(Math.random()*14+1)
      let urlimg = "http://localhost:8081/img/login/"+random+".jpg"
      if(!this.$refs.login.style)
      this.$router.go(0)
      this.$refs.login.style.backgroundImage = 'url("'+urlimg+'")'
    }
  },
  created() {
    this.$store.commit('isAnother',false)   //跳转到Login页面后移除其他几个基础组件
    
  },
  mounted() {
    this.changeimg()
    setInterval(() => {
      this.changeimg()
    }, 10000);
   
  },
  
}
</script>

<style>
  #login {
     width: 100%;
     height: 100%;
     /* background-image: url(../../../public/img/login/1.jpg); */
     background-repeat: no-repeat;
     background-size: cover;
     transition: all 1.5s;
  }
  .login-frame {
    width: 1200px;
    height: 51vw;
    /* background-color: antiquewhite; */
    margin: 0 auto;
    position: relative;
    opacity: 0.9;
  }
  .login-frame-center {
    position: relative;
    width: 400px;
    height: 550px;
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
    height: 300px;
    /* background-color: darkcyan; */
    margin: 0 auto;
    position: relative;
  }
  .input-border-account ,.input-border-password{
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
  .input-account ,.input-password {
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
  .input-login {
    position: absolute;
    width: 350px;
    height: 170px;
    /* background-color: darkgray; */
    bottom: -10px;
    border-bottom: 1px solid gray;
  }
  .input-remenber-checkbox {
    position: absolute;
    width: 100px;
    height: 20px;
    top: 0px;
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
  }
  .login-register-font {
    position: absolute;
    right: -6px; 
    top: 4px;
    width: 160px;
    height: 20px;
    font-size: 10px;
    cursor: pointer;
  }
  .login-register-font:hover {
    color: cornflowerblue;
    
  }
  .login-register-font p{
    float: left;
    margin-left: 5px;

  }
  .login-buttom-frame {
    position: absolute;
    bottom: 0px;
    left: 0px;
  }
  .login-buttom ,.reback-buttom {
    position: absolute;
    width: 300px;
    height: 50px;
    border-radius: 10px;
    top: -130px;
    left: 25px;
    text-align: center;
    line-height: 50px;
    font-size: 17px;
  }
  .login-buttom {
    background-color: deepskyblue;
    color: #fff;
    cursor: pointer;
    line-height: 32px;
  }
  .login-buttom:hover {
    background-color: rgb(3, 163, 216);
    box-shadow: 1px 1px 5px #000;
  }
  .reback-buttom {
    top: -64px;
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
    cursor: pointer;
  }
  .reback-buttom:hover {
    border: 1px solid cornflowerblue;
    background-color: rgb(245, 249, 253);
    box-shadow: 1px 1px 5px #000;
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
  .frame-bottom-other {
    width: 200px;
    height: 100px;
    margin-left: 5px;
    font-size: 15px;
    font-size: 10px;
  }
  .frame-bottom-other p{
    width: 100px;
    float: left;
  }
  .frame-bottom-other span{
    float: left;
    margin-left: 5px;
    
  }
  .register-a a:hover {
    color: cornflowerblue;
  }
  .restart-a a:hover {
    color: cornflowerblue;
  }
  


  
</style>