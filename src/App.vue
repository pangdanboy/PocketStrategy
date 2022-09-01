<template>
  <div id="app">
    <!--导航栏-->
    <nav :class="headerClass">
      <div class="logo">
        <h1>@拉吉莫拉拉</h1>
      </div>
      <ul class="nav-list">
        <li>
          <i class="iconfont icon-sousuo"></i>搜索
          <b></b>
        </li>
        <router-link to="/home" tag="li">
          <i class="iconfont icon-shouye"></i>首页
          <b></b>
        </router-link>
        <li>
          <i class="iconfont icon-jinglingqiu"></i>图鉴
          <b></b>
          <div>
            <router-link to="/all" tag="span"><i class="iconfont icon-xingzhuang"></i>全部</router-link>
            <router-link to="/category" tag="span"><i class="iconfont icon-fenlei"></i>分类</router-link>
            <router-link to="/tag" tag="span"><i class="iconfont icon-24gf-tags"></i>标签</router-link>
          </div>
        </li>
        <li>
          <i class="iconfont icon-siyecao"></i>娱乐
          <b></b>
          <div>
            <router-link to="/album" tag="span"><i class="iconfont icon-tupianbizhi"></i>壁纸</router-link>
            <router-link to="/talk" tag="span"><i class="iconfont icon-liuyan"></i>说说</router-link>
          </div>
        </li>
        <router-link to="/about" tag="li">
          <i class="iconfont icon-paper"></i>关于
          <b></b>
        </router-link>
        <router-link to="/message" tag="li">
          <i class="iconfont icon-liuyan1"></i>留言
          <b></b>
        </router-link>
        <li @click="showLogin" v-if="!this.$store.state.currentUser">
          <i class="iconfont icon-denglu-copy"></i>登录
          <b></b>
        </li>
        <!--根据当前用户是否登录决定是否创建用户默认头像-->
        <li class="avatar" v-if="this.$store.state.currentUser">
          <img src="./assets/images/userAvatar.jpg">
          <b></b>
          <div class="user-info">
            <router-link to="/user" tag="span">个人中心</router-link>
            <span @click="logout">退出登录</span>
            <router-link to="/EditStrategy" tag="span" v-if="this.$store.state.admin">写攻略</router-link>
          </div>
        </li>
      </ul>
    </nav>
    <!--主体内容部分-->
    <div class="wrap">
      <div class="wrapContainer">
        <!--内容部分-->
        <main>
            <!--路由出口-->
            <router-view @refreshScroll="refreshScroll" @showEditEmail="showEditEmail"></router-view>
            <!--页面一键向下滚动按钮-->
            <span class="pageDown" @click="pageDown" v-show="this.$route.fullPath === '/home'">
              <i class="iconfont icon-xiangxia2"></i>
            </span>
        </main>
        <!--底部信息-->
        <Footer v-show="this.$route.fullPath === '/home'"></Footer>
      </div>
    </div>
    <!--回到顶部和切换页面主题工具-->
    <div class="tools" v-show="this.$route.fullPath === '/home' && headerClass !== 'start'">
      <div class="pageUp" @click="pageTop">UP</div>
      <div class="changeTheme">
        <i class="iconfont icon-suntaiyang"></i>
<!--        <i class="iconfont icon-moon"></i>-->
      </div>
    </div>
    <!--登录框-->
    <Login v-show="loginShow" @hiddenLogin="hiddenLogin" @showRegister="showRegister"></Login>
    <!--注册框-->
    <Register v-show="RegisterShow" @hiddenRegister="hiddenRegister" @showLogin="showLogin"></Register>
    <!--修改绑定邮箱框-->
    <EditEmail v-show="EditEmailShow" @hiddenEditEmail="hiddenEditEmail"></EditEmail>
    <div class="mask" ref="mask"></div>
  </div>
</template>
<script>
import IScroll from 'iscroll-custom/build/iscroll-probe'
import Login from './components/Login'
import Register from './components/Register'
import EditEmail from './components/EditEmail'
import Footer from './components/Footer'
import router from './router/index'
export default {
  name: 'App',
  data: function () {
    return {
      // 页面滚动对象(iscroll)
      scroll: null,
      // 导航栏动态类名
      headerClass: 'start',
      // 登录框是否显示
      loginShow: false,
      // 注册框是否显示
      RegisterShow: false,
      // 邮箱修改框是否显示
      EditEmailShow: false
    }
  },
  computed: {
  },
  components: {
    Login,
    Register,
    EditEmail,
    Footer
  },
  mounted () {
    console.log(this.$route)
    // 如果当前用户已经登录，刷新页面时更新用户状态
    if (localStorage.userToken) {
      this.$store.commit('changeCurrentUser', true)
      // 重置弹出框状态
      this.$refs.mask.style = 'display: none'
      this.loginShow = false
      this.RegisterShow = false
      this.EditEmailShow = false
      // 刷新页面时更新用户信息
      this.$axios.get('users/current').then(res => {
        console.log(res.data)
        if (res.data.admin) {
          // 修改当前用户权限
          this.$store.commit('changeAdmin', true)
        }
      }).catch(err => {
        console.log(err)
      })
    } else {
      this.$store.commit('changeCurrentUser', false)
    }
    // 创建iscroll对象
    this.scroll = new IScroll('.wrap', {
      mouseWheel: true, // 允许鼠标滚轮
      scrollbars: true, // 滚动条
      interactiveScrollbars: true, // 允许点击交互滚动条
      probeType: 3, // 像素级滚动监听
      disablePointer: true // 禁用鼠标拖动
    })
    // 监听滚动，动态为导航栏添加类名
    this.scroll.on('scroll', e => {
      // 此处不用箭头函数可以用this.x和this.y访问实时位置，用了箭头函数需要从实例上访问
      // this.scroll.x
      // 实时改变网页滚动距离和方向
      this.$store.commit('changeScrollTop', -Math.round(this.scroll.y))
      this.$store.commit('changeScrollDirection', this.scroll.directionY)
      console.log(this.$store.state.currentScrollTop)
      console.log(-Math.round(this.scroll.y))
      if (this.scroll.directionY === 1) {
        this.hiddenHeader()
      } else {
        this.showHeader()
      }
      // 解决isrcoll的scrollTo方法指定页面滚动时，数值不准的问题
      if (-Math.round(this.scroll.y) === 0) {
        this.startHeader()
      }
    })
    console.log(this.$route)
  },
  provide () {
    return {
    }
  },
  methods: {
    showHeader () {
      console.log('显示头部')
      this.headerClass = 'show'
    },
    hiddenHeader () {
      console.log('隐藏头部')
      this.headerClass = 'hidden'
    },
    startHeader () {
      console.log('头部初始状态')
      this.headerClass = 'start'
    },
    pageDown () {
      console.log('点击页面滚动')
      this.scroll.scrollTo(0, -window.innerHeight, 1000)
    },
    pageTop () {
      this.scroll.scrollTo(0, 0, 1000)
    },
    // 刷新iscroll
    refreshScroll () {
      if (this.scroll !== null) {
        this.scroll.refresh()
      }
    },
    showLogin () {
      this.loginShow = true
      this.$refs.mask.style = 'display: block'
    },
    hiddenLogin () {
      this.loginShow = false
      this.$refs.mask.style = 'display: none'
    },
    showRegister () {
      this.RegisterShow = true
      this.$refs.mask.style = 'display: block'
    },
    hiddenRegister () {
      this.RegisterShow = false
      this.$refs.mask.style = 'display: none'
    },
    showEditEmail () {
      this.EditEmailShow = true
      this.$refs.mask.style = 'display: block'
    },
    hiddenEditEmail () {
      this.EditEmailShow = false
      this.$refs.mask.style = 'display: none'
    },
    logout () {
      this.$message({
        message: '已退出登录',
        type: 'warning'
      })
      // 清除token
      localStorage.removeItem('userToken')
      // 如果当前不在主页，点击退出登录后返回主页
      // console.log(this.$route)
      if (this.$route.fullPath !== '/home') {
        router.push('/home')
      }
      // 修改登录状态
      this.$store.commit('changeCurrentUser', false)
    }
  },
  watch: {
  }
}
</script>
<style scoped lang="scss">
  #app{
    nav{
      font-size: 14px;
      width: 100%;
      height: 50px;
      color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;
      transition: all 1s;
      position: fixed;
      top: 0;
      z-index: 999;
      &.show{
        top: 0;
        background-color: rgba(255, 255, 255, 0.5);
        color: #000000;
      }
      &.hidden{
        top: -50px;
      }
      &.start{
        background-color: rgba(255, 255, 255, 0);
        color: #ffffff;
      }
      .logo{
        h1{
          white-space: nowrap;
        }
      }
      .nav-list{
        display: flex;
        justify-content: space-between;
        li{
          margin: 0 15px;
          width: 75px;
          height: 25px;
          cursor: pointer;
          position: relative;
          text-align: center;
          line-height: 25px;
          i{
            margin-right: 2px;
          }
          b{
            display: inline-block;
            height: 3px;
            width: 0;
            background-color: #fff;
            position: absolute;
            bottom: -2px;
            left: 50%;
            transform: translate(-50%);
            transition: all 0.5s;
          }
          &:hover{
            b{
              width: 65%;
            }
            div{
              display: flex;
            }
          }
          div{
            width: 100%;
            display: none;
            flex-direction: column;
            position: absolute;
            top: 28px;
            left: 50%;
            transform: translate(-50%);
            background-color: #ffffff;
            span{
              width: 100%;
              height: 30px;
              text-align: center;
              font-size: 12px;
              line-height: 30px;
              color: #000000;
              i{
                margin-right: 5px;
              }
              &:hover{
                background-color: skyblue;
              }
            }
          }
        }
        .avatar{
          img{
            width: 25px;
            height: 25px;
            border-radius: 50%;
          }
          &:hover{
            .user-info{
              display: flex;
            }
          }
          .user-info{
            width: 100%;
            display: none;
            flex-direction: column;
            position: absolute;
            top: 28px;
            left: 50%;
            transform: translate(-50%);
            background-color: #ffffff;
            span{
              width: 100%;
              height: 30px;
              text-align: center;
              font-size: 12px;
              line-height: 30px;
              color: #000000;
            }
          }
        }
      }
    }
    main{
      .pageDown{
        display: inline-block;
        width: 40px;
        height: 40px;
        background-color: rgba(255, 255, 255, 0.2);
        position: absolute;
        top: 93vh;
        cursor: pointer;
        left: 50%;
        transform: translate(-50%);
        animation: bounce 1s infinite;
        @keyframes bounce {
          from{
            top: 93vh;
          }
          to{
            top: 94vh;
          }
        }
        i{
          font-size: 30px;
          position: absolute;
          color: #ffffff;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .tools{
      width: 35px;
      height: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      position: fixed;
      bottom: 15px;
      right: 15px;
      transition: all 1s;
      .pageUp{
        width: 100%;
        height: 35px;
        background-color: rgba(0, 0, 0, 0.7);
        text-align: center;
        line-height: 35px;
        cursor: pointer;
        color: #ffffff;
      }
      .changeTheme{
        width: 100%;
        height: 35px;
        background-color: rgba(0, 0, 0, 0.7);
        text-align: center;
        line-height: 35px;
        color: #ffffff;
      }
    }
    .wrap{
      position: relative;
      height: 100vh;
      overflow: hidden;
    }
    #login, #register, #edit_email{
      position: fixed;
      left: 50%;
      top: 150px;
      transform: translate(-50%);
      z-index: 1000;
    }
    #edit_email{
      top: 35%;
    }
    .mask{
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      z-index: 999;
      display: none;
    }
  }
</style>
