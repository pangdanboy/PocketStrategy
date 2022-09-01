<template>
  <div id="register">
    <form ref="form">
      <div class="email" :class="emailClass">
        <span>邮箱:</span>
        <input type="email" v-model="email" @blur="checkEmail">
        <span class="format-error-tips" v-show="emailErrorShow">邮箱格式错误</span>
      </div>
      <div class="verifyCode" :class="codeClass">
        <span>验证码:</span>
        <input type="text" v-model="verifyCode" @blur="checkVerifyCode">
        <button @click.prevent="getCode" ref="codeBtn" :disabled="code !== ''">获取验证码</button>
        <span class="format-error-tips" v-show="codeErrorShow">验证码不能为空</span>
        <span class="format-error-tips" v-show="codeError">验证码错误</span>
      </div>
      <div class="password" :class="passwordClass">
        <span>密码:</span>
        <input type="password" v-model="password" @blur="checkPassword">
        <span class="format-error-tips" v-show="passwordErrorShow">密码不能为空</span>
      </div>
      <div class="submit">
        <input type="submit" @click.prevent="register" value="注册" ref="submit">
      </div>
      <div class="cancel" @click="hidden">
        <i class="iconfont icon-xianshi_quxiao"></i>
      </div>
      <div class="jumpLogin">
        <span>已有账号?</span>
        <span class="clickLogin" @click="showLogin">返回登录</span>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Register',
  data: function () {
    return {
      // 邮箱
      email: '',
      // 密码
      password: '',
      // 用户输入验证码
      verifyCode: '',
      // 获取验证码
      code: '',
      // 验证码有效时间
      codeTime: 60,
      // 定时器
      timer: null,
      // 验证码失效定时器
      codeTimer: null,
      // 验证错误
      errorShow: false,
      // 邮箱格式错误
      emailErrorShow: false,
      // 密码格式错误
      passwordErrorShow: false,
      // 验证码格式错误
      codeErrorShow: false,
      // 验证码验证错误
      codeError: false,
      // 提示样式类名
      emailClass: '',
      passwordClass: '',
      codeClass: ''
    }
  },
  computed: {
  },
  methods: {
    hidden () {
      // 点击取消按钮调用父组件传递方法，隐藏注册框
      this.$emit('hiddenRegister')
    },
    showLogin () {
      // 隐藏注册框
      this.hidden()
      // 点击返回登录按钮调用父组件传递方法，显示登录
      this.$emit('showLogin')
    },
    checkEmail () {
      console.log('email失去焦点')
      const emailExp = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (this.email.length === 0 || !emailExp.test(this.email)) {
        // 提示错误
        this.emailErrorShow = true
        // 边框提示错误
        this.emailClass = 'error'
      } else {
        this.emailErrorShow = false
        this.emailClass = ''
      }
    },
    checkPassword () {
      console.log('password失去焦点')
      if (this.password.length === 0) {
        this.passwordErrorShow = true
        this.passwordClass = 'error'
      } else {
        this.passwordErrorShow = false
        this.passwordClass = ''
      }
    },
    checkVerifyCode () {
      console.log('verifyCode失去焦点')
      if (this.verifyCode.length === 0) {
        this.codeErrorShow = true
        this.codeClass = 'error'
      } else {
        this.codeErrorShow = false
        this.codeClass = ''
      }
    },
    getCode () {
      if (this.email.length !== 0 && !this.emailErrorShow) {
        this.$axios.get('verifyCode/verify?email=' + this.email).then(res => {
          if (res.data.code === 404) {
            this.$message({
              message: '邮箱不存在',
              type: 'warning'
            })
          } else {
            console.log(res.data)
            this.code = res.data.verifyCode
            this.$message({
              message: '发送成功',
              type: 'success'
            })
            this.codeTimer = setTimeout(() => {
              this.code = ''
              console.log('验证码失效')
            }, 60000)
            this.timer = setInterval(() => {
              this.$refs.codeBtn.innerText = this.codeTime + '秒'
              this.codeTime--
              console.log('定时器')
              if (this.codeTime === 0) {
                clearInterval(this.timer)
                this.codeTime = 60
                this.$refs.codeBtn.innerText = '重新获取'
              }
            }, 1000)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    register () {
      console.log('点击了注册')
      console.log(this.code)
      // 判断验证码
      if (this.verifyCode !== this.code + '') {
        this.codeError = true
      } else if (!this.emailErrorShow && !this.passwordErrorShow) {
        console.log('发送请求')
        this.$axios.post('users/register', {
          name: this.username,
          email: this.email,
          password: this.password
        }).then((res) => {
          console.log(res.data)
          if (res.data.code === 400) {
            this.$message({
              message: '该邮箱已被注册！',
              type: 'warning'
            })
          } else {
            this.openSuccess()
          }
          // 两种情况都需要清除定时器，重置验证码时效，清空验证码
          clearInterval(this.timer)
          clearTimeout(this.codeTimer)
          this.codeTime = 60
          this.code = ''
          this.$refs.codeBtn.innerText = '获取验证码'
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    openSuccess () {
      this.$message({
        message: '注册成功！请返回登录',
        type: 'success'
      })
      // 返回登录
      this.showLogin()
      // 清空表单数据
      this.$refs.form.reset()
    }
  },
  watch: {
    // 控制email的长度
    email: function (newValue, oldValue) {
      if (newValue.length >= 64) {
        this.email = oldValue
      }
    },
    // 控制password的长度
    password: function (newValue, oldValue) {
      if (newValue.length >= 16) {
        this.password = oldValue
      }
    },
    // 控制username的长度
    username: function (newValue, oldValue) {
      if (newValue.length >= 16) {
        this.username = oldValue
      }
    }
  }
}
</script>

<style scoped lang="scss">
  #register{
  width: 500px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.6);
  form{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding-top: 20px;
    div{
      width: 430px;
      height: 70px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: relative;
      &.error{
        input{
          border: 1px solid red !important;
        }
      }
      span{
        margin-right: 5px;
        font-size: 18px;
      }
      .format-error-tips{
        position: absolute;
        bottom: -5px;
        left: 110px;
        font-size: 14px;
        color: red;
      }
      input[type=password],input[type=email]{
        width: 300px;
        height: 35px;
        border: none;
        outline: none;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 5px;
        margin-right: 20px;
      }
      input[type=submit]{
        width: 300px;
        height: 35px;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        margin-right: 20px;
      }
    }
    .verifyCode{
      input{
        width: 180px;
        height: 35px;
        border: none;
        outline: none;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 5px;
      }
      button{
        height: 35px;
        width: 80px;
        border: none;
        margin-right: 20px;
        margin-left: 40px;
        cursor: pointer;
        background-color: rgba(240, 240, 240);
        border-radius: 5px;
      }
    }
    .cancel{
      width: 20px;
      height: 20px;
      position: fixed;
      top: 2px;
      right: 2px;
      margin: 0;
      cursor: pointer;
      i{
        font-size: 20px;
      }
    }
    .jumpLogin{
      width: 150px;
      height: 20px;
      position: fixed;
      bottom: 10px;
      left: 30px;
      span{
        font-size: 14px;
      }
      .clickLogin{
        cursor: pointer;
        color: rgb(171, 84, 90);
      }
    }
  }
}
</style>
