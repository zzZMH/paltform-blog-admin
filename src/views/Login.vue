<template>
  <div class="signinCont">
    <div class="signinBG">
      <div class="signinForm">
        <div class="formLogo"></div>
        <h2>blog-admin-platform</h2>
        <!-- <el-form :model="loginForm" :rules="loginFormRules"> -->
        <!-- <el-form-item prop="userName"> -->
          <el-input placeholder="请输入用户名" v-model="loginForm.userName" prefix-icon="el-icon-user" type="text"></el-input>
        <!-- </el-form-item> -->
        <!-- <el-form-item prop="userName"> -->
          <el-input placeholder="请输入密码" v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
        <!-- </el-form-item> -->
        <el-input v-show="isSignin" placeholder="请重复密码" v-model="loginForm.repeatwpwd" prefix-icon="el-icon-lock" type="password"></el-input>
        <el-button v-show="!isSignin" type="primary" @click="doSignIn">登 录</el-button>
        <el-link v-show="!isSignin" :underline="false"><span @click="toSignUp">还没账号吗？</span></el-link>
        <el-button v-show="isSignin" @click="doSignUp">注 册</el-button>
        <el-link v-show="isSignin" :underline="false"><span @click="toSignIn">返回登录</span></el-link>
        <!-- </el-form> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return { 
      isSignin: false,
      loginForm: {
        userName: '',
        password: '',
        repeatwpwd: ''
      },
      loginFormRules: {
        userName: [{
          trigger: 'blur',
          validator (rule, value, callback) {
            if (value === '') {
              callback(new Error('请输入用户名AAA'))
            } else {
              callback()
            }
          }
        }]
      }
    }
  },
  methods: {
    toSignIn () {
      this.isSignin = false
    },
    toSignUp () {
      this.isSignin = true
    },
    doSignIn () {
      console.log(this.userName)
    },
    doSignUp () {
      console.log(this.repeatwpwd)
    }
  }
}
</script>

<style lang="scss" scoped>
.signinCont {
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 550px;
  .signinBG {
    position: relative;
    width: 100%;
    height: 360px;
    background-color: #409eff;
    background-image: url('../assets/login_bg.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    top: 50%;
    transform:translate(0, -50%);
    .signinForm {
      position: relative;
      width: 360px;
      height: 410px;
      top: -70px;
      left: 50%;
      transform:translate(-50%, 0);
      border-radius: 4px;
      border-top: 10px solid #409eff;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.2);
      color: #409eff;
      text-align: center;
      .formLogo {
        float: left;
        width: 60px;
        height: 50px;
        background-image: url('../assets/yuedu.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 20px;
        margin-left: 150px;
      }
      h2 {
        float: left;
        width: 100%;
      }
      .el-input, .el-button {
        margin: 0 25px 20px 25px;
        width: calc(100% - 50px);
      }
      .el-link {
        color: #409eff;
        font-size: 12px;
      }
    }
  }
}
</style>
