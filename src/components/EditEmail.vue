<template>
  <div id="edit_email">
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
    <div class="submit">
      <input type="button" @click.prevent="editEmail" value="修改">
    </div>
    <div class="cancel" @click="hidden">
      <i class="iconfont icon-xianshi_quxiao"></i>
    </div>
  </div>
</template>

<script>
import router from './../router/index'
export default {
  name: 'EditEmail',
  data: function () {
    return {
      email: '',
      code: '',
      codeTime: 60,
      // 定时器
      timer: null,
      // 验证码失效定时器
      codeTimer: null,
      verifyCode: '',
      emailClass: '',
      codeClass: '',
      emailErrorShow: false,
      codeErrorShow: false,
      codeError: false
    }
  },
  methods: {
    hidden () {
      // 调用父组件方法隐藏修改邮件框
      this.$emit('hiddenEditEmail')
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
    editEmail () {
      if (this.verifyCode !== this.code + '') {
        this.codeError = true
      } else if (!this.emailErrorShow && !this.codeErrorShow) {
        this.$axios.put('users/editEmail', {
          email: this.email
        }).then(res => {
          console.log(res.data)
          if (res.data.code === 400) {
            this.$message({
              message: '邮箱已被绑定',
              type: 'warning'
            })
          } else {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            // 隐藏弹出框
            this.hidden()
            router.push('/Refresh')
          }
          // 两种情况需要清除定时器，重置验证码时效，清空验证码
          clearInterval(this.timer)
          clearTimeout(this.codeTimer)
          this.codeTime = 60
          this.code = ''
          this.$refs.codeBtn.innerText = '获取验证码'
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  #edit_email{
    width: 400px;
    height: 280px;
    background-color: rgba(255, 255, 255, 0.5);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding-top: 50px;
    div{
      width: 350px;
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
        left: 80px;
        font-size: 14px;
        color: red;
      }
      input{
        width: 250px;
        height: 35px;
        border: none;
        outline: none;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 5px;
        margin-right: 20px;
      }
      input[type=button]{
        cursor: pointer;
      }
    }
    .verifyCode{
      input{
        width: 150px;
        height: 35px;
        border: none;
        outline: none;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 5px;
        margin-right: 10px;
      }
      button{
        height: 35px;
        width: 80px;
        border: none;
        margin-right: 20px;
        margin-left: 10px;
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
  }
  </style>
