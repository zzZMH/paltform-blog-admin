<template>
  <div class="signinCont">
    <div class="signinBG">
      <div class="signinForm">
        <div class="formLogo"></div>
        <h2>blog-admin-platform</h2>
        <!-- 登录 -->
        <el-form :model="loginForm" :rules="loginFormRules" v-if="!isSignin" key="loginForm" ref="loginForm">
          <el-form-item prop="userName">
            <el-input ref="userNameIn" placeholder="请输入用户名" name="userName" v-model="loginForm.userName" prefix-icon="el-icon-user" type="text" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input ref="passwordIn" placeholder="请输入密码" name="password" v-model="loginForm.password" prefix-icon="el-icon-lock" type="password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item key="rpBlock"></el-form-item>
          <el-button type="primary" @click.prevent="doSignIn" :loading="loadingLogin">登 录</el-button>
          <el-link><span @click.prevent="toSignUp">还没账号吗？</span></el-link>
        </el-form>
        <!-- 注册 -->
        <el-form :model="signupForm" :rules="signupFormRules" v-else key="signupForm" ref="signupForm">
          <el-form-item prop="userName">
            <el-input ref="userNameUp" placeholder="请输入用户名" name="userName" v-model="signupForm.userName" prefix-icon="el-icon-user" type="text" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input ref="passwordUp" placeholder="请输入密码" name="password" v-model="signupForm.password" prefix-icon="el-icon-lock" type="password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="repeatpwd">
            <el-input ref="repeatpwd" placeholder="请确认密码" name="repeatpwd" v-model="signupForm.repeatpwd" prefix-icon="el-icon-key" type="password" autocomplete="off"></el-input>
          </el-form-item>
          <el-button type="primary" @click.prevent="doSignUp" :loading="loadingSignup">注 册</el-button>
          <el-link><span @click.prevent="toSignIn">快去登录吧！</span></el-link>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { validateUserName, validatePassword, validateRepeatPwd } from '../utils/validate'
export default {
  name: 'login',
  data () {
    const vldName = (rule, value, callback) => {
      if (!validateUserName(value).flag) {
        callback(new Error(validateUserName(value).msg))
      } else {
        callback()
      }
    }
    const vldSigninPwd = (rule, value, callback) => {
      if (!validatePassword(value, false).flag) {
        callback(new Error(validatePassword(value, false).msg))
      } else {
        callback()
      }
    }
    const vldSignupPwd = (rule, value, callback) => {
      if (!validatePassword(value, true).flag) {
        callback(new Error(validatePassword(value, true).msg))
      } else {
        callback()
      }
    }
    const vldRptPwd = (rule, value, callback) => {
      if (!validateRepeatPwd(value, this.signupForm.password).flag) {
        callback(new Error(validateRepeatPwd(value, this.signupForm.password).msg))
      } else {
        callback()
      }
    }
    return {
      isSignin: false,
      loadingLogin: false,
      loadingSignup: false,
      loginForm: {
        userName: '',
        password: ''
      },
      signupForm: {
        userName: '',
        password: '',
        repeatpwd: ''
      },
      loginFormRules: {
        userName: [{
          trigger: 'blur',
          validator: vldName
        }],
        password: [{
          trigger: 'blur',
          validator: vldSigninPwd
        }]
      },
      signupFormRules: {
        userName: [{
          trigger: 'blur',
          validator: vldName
        }],
        password: [{
          trigger: 'blur',
          validator: vldSignupPwd
        }],
        repeatpwd: [{
          trigger: 'blur',
          validator: vldRptPwd
        }]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.loginForm.userName = ''
      this.loginForm.password = ''
    },
    resetSignupForm () {
      this.signupForm.userName = ''
      this.signupForm.password = ''
      this.signupForm.repeatpwd = ''
    },
    toSignIn () {
      this.isSignin = false
      this.resetSignupForm()
    },
    toSignUp () {
      this.isSignin = true
      this.resetLoginForm()
    },
    doSignIn () {
      const validFunc = (valid) => {
        if (valid) {
          if (this.loginForm.userName === 'zmh' && this.loginForm.password === '00000000') {
            this.$message({
              type: 'success',
              message: '登录成功！'
            })
            this.loadingLogin = false
            this.$router.push({ path: '/' })
          } else {
            this.$message.error('登录失败')
            this.loadingLogin = false
          }
        } else {
          this.loadingLogin = false
        }
      }
      this.loadingLogin = true
      this.$refs.loginForm.validate(validFunc)
    },
    doSignUp () {
      const validFunc = (valid) => {
        if (valid) {
          this.$message({
            type: 'success',
            message: '注册成功！'
          })
          this.loadingSignup = false
          this.toSignIn()
        } else {
          this.loadingSignup = false
        }
      }
      this.loadingSignup = true
      this.$refs.signupForm.validate(validFunc)
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
      .el-form {
        padding: 0 25px;
      }
      .el-button {
        margin: 0 0 10px 0;
        width: 100%;
        font-size: 15px;
      }
      .el-link {
        color: #C0C4CC;
        font-size: 12px;
      }
      .el-link:hover {
        color: #409eff;
        font-size: 12px;
      }
    }
  }
}
</style>
