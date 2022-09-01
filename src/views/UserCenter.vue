<template>
  <div id="user_center">
    <Banner>
      <template #title>
        <p class="title">个人中心</p>
      </template>
    </Banner>
    <Content>
      <template #content-in>
        <div class="content-in">
          <div class="left" >
            <img src="./../assets/images/userAvatar.jpg" alt="">
            <p>既然你诚心诚意的发问了，那我就大发慈悲的告诉你，为了保护宇宙的和平，贯彻爱与真实的邪恶...</p>
          </div>
          <div class="right">
            <form action="">
              <div class="name">
                昵称：<input type="text" :disabled="!infoEdit" v-model="name">
              </div>
              <div class="user_info">
                个人简介：<input type="text" :disabled="!infoEdit" v-model="user_info">
              </div>
              <div class="user_web">
                个人网站：<input type="text" :disabled="!infoEdit" v-model="user_web">
              </div>
              <div class="email">
                绑定邮箱：<input type="text" :disabled="!emailEdit" v-model="email">
                <span @click="editEmail">修改</span>
              </div>
              <div class="operation">
                <input type="button" value="编辑" @click="edit">
                <input type="submit" value="保存" @click.prevent="save" :disabled="!infoEdit">
              </div>
            </form>
          </div>
        </div>
      </template>
    </Content>
  </div>
</template>

<script>
import Banner from './../components/Banner'
import Content from './../components/Content'
export default {
  name: 'UserCenter',
  data: function () {
    return {
      infoEdit: false,
      emailEdit: false,
      name: '',
      user_info: '',
      user_web: '',
      email: ''
    }
  },
  components: {
    Banner,
    Content
  },
  mounted () {
    // 刷新iscroll
    this.$emit('refreshScroll')
    // 获取当前登录用户信息
    this.$axios.get('users/current').then(res => {
      console.log(res.data)
      this.name = res.data.name
      this.user_info = res.data.user_info ? res.data.user_info : '暂无简介，请用一句话介绍自己'
      this.user_web = res.data.user_web ? res.data.user_web : '暂无网站，任何可以找到你的地方'
      this.email = res.data.email
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    edit () {
      this.infoEdit = true
    },
    editEmail () {
      this.emailEdit = true
      // 调用父组件方法显示邮箱修改框
      this.$emit('showEditEmail')
    },
    save () {
      this.infoEdit = false
      this.$axios.put('users/edit', {
        name: this.name,
        user_info: this.user_info,
        user_web: this.user_web
      }).then(res => {
        console.log(res.data)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  #banner{
  width: 100%;
  height: 80vh;
  background: url('./../assets/images/user.png') no-repeat;
  background-size: cover;
  position: relative;
  .title{
    width: 0px;
    font-size: 32px;
    color: rgba(255,255,255,1);
    position: absolute;
    text-align: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    overflow: hidden;
    animation: showText 4s steps(8) 0s forwards;
  }
  @keyframes showText {
    from{
      width: 0;
    }
    to{
      width: 257px;
    }
  }
}
  #content{
    .content-in{
      width: 1200px;
      height: 500px;
      background: linear-gradient(to right bottom,rgba(255,255,255,0.8),rgba(255,255,255,0.3));
      margin: 0 auto;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .left{
        width: 15%;
        height: 420px;
        background-color: rgb(237, 228, 64);
        margin-right: 50px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding-top: 60px;
        box-sizing: border-box;
        img{
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-bottom: 20px;
        }
        p{
          width: 100px;
        }
      }
      .right{
        width: 50%;
        height: 420px;
        background-color: rgb(237, 228, 64);
        border-radius: 20px;
        form{
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding-top: 50px;
          box-sizing: border-box;
          div{
            width: 450px;
            margin-bottom: 50px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            input{
              width: 300px;
              border: none;
              outline: none;
              background-color: transparent;
              border-bottom: 2px solid #ffffff;
              margin-right: 30px;
              padding: 5px;
              box-sizing: border-box;
            }
          }
          .email{
            width: 510px;
            margin-bottom: 20px;
            input{
              margin-right: 0;
            }
            span{
              display: inline-block;
              width: 60px;
              height: 35px;
              background-color: #ffffff;
              border-radius: 10px;
              cursor: pointer;
              line-height: 35px;
              text-align: center;
            }
          }
          .operation{
            input{
              border: none;
              width: 100px;
              height: 35px;
              background-color: #fff;
              border-radius: 10px;
              margin-right: 70px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>
