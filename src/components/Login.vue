<template>
  <div id="login">
    <form ref="form">
      <div class="slogan">
        <p>欢迎来到口袋觉醒</p>
      </div>
      <div class="username" :class="emailClass">
        <span>邮箱:</span>
        <input type="email" v-model="email" @blur="checkEmail">
        <span class="format-error-tips" v-show="emailErrorShow">账号不能为空</span>
      </div>
      <div class="password" :class="passwordClass">
        <span>密码:</span>
        <input type="password" v-model="password" @blur="checkPassword">
        <span class="format-error-tips" v-show="passwordErrorShow">密码不能为空</span>
      </div>
      <div class="submit">
        <input type="submit" @click.prevent="login" value="登录" ref="submit">
      </div>
      <div class="cancel" @click="hidden">
        <i class="iconfont icon-xianshi_quxiao"></i>
      </div>
      <div class="jumpRegister">
        <span>没有账号?</span>
        <span class="clickRegister" @click="showRegister">点击注册</span>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  data: function () {
    return {
      // 邮箱
      email: '',
      // 密码
      password: '',
      // 邮箱格式错误
      emailErrorShow: false,
      // 密码格式错误
      passwordErrorShow: false,
      // 提示样式类名
      emailClass: '',
      passwordClass: ''
    }
  },
  computed: {
  },
  methods: {
    hidden () {
      // 点击取消按钮调用父组件传递方法，隐藏登录框
      this.$emit('hiddenLogin')
    },
    checkEmail () {
      console.log('email失去焦点')
      if (this.email.length === 0) {
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
    login () {
      console.log('点击了登录')
      if (!this.emailErrorShow && !this.passwordErrorShow) {
        console.log('发送请求')
        this.$axios.post('users/login', {
          email: this.email,
          password: this.password
        }).then((res) => {
          console.log(res.data)
          if (res.data.code === 404) {
            this.$message({
              message: '用户不存在!',
              type: 'warning'
            })
          }
          if (res.data.code === 400) {
            this.$message.error('密码错误!')
          }
          if (res.data.code === 200) {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            // 点击取消按钮调用父组件传递方法，隐藏登录框
            this.$emit('hiddenLogin')
            // 修改当前用户登录状态
            this.$store.commit('changeCurrentUser', true)
            if (res.data.admin) {
              // 修改当前用户权限
              this.$store.commit('changeAdmin', true)
            }
            // 保存token到localstorage
            const { token } = res.data
            localStorage.setItem('userToken', token)
            // 清空表单数据
            this.$refs.form.reset()
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    showRegister () {
      // 同时隐藏登录框
      this.hidden()
      // 点击注册按钮调用父组件传递方法，显示注册框
      this.$emit('showRegister')
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
  #login{
    width: 500px;
    height: 400px;
    background-color: rgba(255, 255, 255, 0.6);
    form{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      div{
        width: 400px;
        height: 70px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        &.error{
          input{
            border: 1px solid red !important;
          }
        }
        span{
          margin-right: 5px;
          font-size: 20px;
        }
        .error-tips,.format-error-tips{
          position: absolute;
          bottom: -5px;
          left: 50px;
          font-size: 14px;
          color: red;
        }
        .error-tips{
          top: -5px;
          left: 50px;
        }
        input[type=password],input[type=email]{
          width: 300px;
          height: 35px;
          border: none;
          outline: none;
          padding: 5px;
          box-sizing: border-box;
          border-radius: 5px;
        }
        input[type=submit]{
          width: 300px;
          height: 35px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
      }
      .slogan{
        justify-content: center;
        font-size: 22px;
        border-bottom: 1px dashed #000000;
      }
      .submit{
        justify-content: center;
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
      .jumpRegister{
        width: 150px;
        height: 20px;
        position: fixed;
        bottom: 10px;
        left: 30px;
        span{
          font-size: 14px;
        }
        .clickRegister{
          cursor: pointer;
          color: rgb(171, 84, 90);
        }
      }
    }
  }
</style>
