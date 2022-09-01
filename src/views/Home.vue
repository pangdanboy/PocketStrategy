<template>
  <div id="home">
    <Banner>
      <template #title>
        <p class="title">口袋觉醒个人攻略</p>
      </template>
    </Banner>
    <Content>
      <!--填充子组件留下的插槽-->
      <template #content-in>
        <div class="content-in" ref="content">
          <div class="content-in-top">
            <Notice></Notice>
          </div>
          <div class="content-in-bottom">
            <div class="content-in-left">
              <!--攻略具体内容展示界面-->
              <router-link :to="`/Strategy/?articleID=${item.articleID}`" v-for="(item, index) in homeAtlas" :key="item.articleID" tag="div">
                <HomeStrategy :index="index" :item="item" @refreshScroll="refreshScroll"></HomeStrategy>
              </router-link>
              <!--加载更多文章按钮-->
              <div class="checkMore">
                <button @click.prevent="checkMore">查看更多攻略>></button>
              </div>
            </div>
            <div class="content-in-right" ref="myself" :style="{top: mySelfTop + 'px'}">
              <Panel></Panel>
            </div>
          </div>
        </div>
      </template>
    </Content>
  </div>
</template>

<script>
import Banner from './../components/Banner'
import Content from './../components/Content'
import HomeStrategy from '../components/HomeStrategy'
import Panel from './../components/Panel'
import Notice from './../components/Notice'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  data: function () {
    return {
      mySelfTop: 0,
      homeAtlas: {},
      articleNumber: ''
    }
  },
  components: {
    Banner,
    Content,
    HomeStrategy,
    Panel,
    Notice
  },
  computed: {
    // 监听vuex中页面滚动距离数据的变化
    scrollTop () {
      return this.$store.state.currentScrollTop
    }
  },
  mounted () {
    // 刷新iscroll
    this.refreshScroll()
    // 如果当前用户已经登录，修改用户状态
    if (localStorage.userToken) {
      this.$store.commit('changeCurrentUser', true)
    } else {
      this.$store.commit('changeCurrentUser', false)
    }
    // 获取主页攻略文章数据(开始只展示六条，以后每次都获取六条)
    this.$axios.get('articles/getArticle').then(res => {
      console.log(res.data)
      this.homeAtlas = res.data
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    // 刷新iscroll方法，需要传递给子组件HomeAtlas
    refreshScroll () {
      // 刷新iscroll
      this.$emit('refreshScroll')
    },
    // 查看更多文章方法
    checkMore () {
    }
  },
  watch: {
    // 监听获取到的页面滚动距离数据的变化
    scrollTop () {
      // 如果滚动距离大于banner加上内容头部的高度，这时开始改变个人面板的top值
      if (this.$store.state.currentScrollTop >= window.innerHeight + 65) {
        // 如果是向下滚动，且个人面板已经到底，就固定个人面板(通过不断改变个人面板的top值实现)
        if (this.$store.state.scrollDirection === 1 && this.mySelfTop >= 1000) {
          this.mySelfTop = 1000
        } else { // 如果是向上滚动，且个人面板已经脱离底部，就设置个人面板不随网页滚动(通过不断改变个人面板的top值实现)
          this.mySelfTop = this.$store.state.currentScrollTop - window.innerHeight
        }
      } else {
        this.mySelfTop = 0
      }
    }
  }
}
</script>

<style scoped lang="scss">
  #banner{
  width: 100%;
  height: 100vh;
  background: url('./../assets/images/home.jpg') no-repeat;
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
  .content-in{
    width: 1200px;
    margin: 0 auto;
  .content-in-top{
    width: 1200px;
    height: 65px;
    background-color: #ffffff;
    border-radius: 20px;
    margin-bottom: 20px;
    overflow: hidden;
  }
  .content-in-bottom{
    display: flex;
    justify-content: space-between;
    position: relative;
    .content-in-left{
      width: 850px;
      .checkMore{
        margin: 0 auto;
        width: 150px;
        height: 40px;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 20px;
        button{
          width: 100%;
          height: 100%;
          border: none;
          cursor: pointer;
        }
      }
    }
    .content-in-right{
      width: 300px;
      height: 600px;
      background-color: rgba(255, 255, 255, 0.5);
      position: absolute;
      right: 0;
      border-radius: 20px;
      overflow: hidden;
    }
  }
}
</style>
