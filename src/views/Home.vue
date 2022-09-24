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
              <router-link :to="`/Strategy/?articleID=${item._id}`" v-for="(item, index) in homeAtlas" :key="item.articleID" tag="div">
                <HomeStrategy :index="index" :item="item" @refreshScroll="refreshScroll"></HomeStrategy>
              </router-link>
              <!--加载更多文章按钮，文章没有加载完成时显示-->
              <div class="checkMore" v-show="articleNumber !== articleCount">
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
      // 攻略文章数据
      homeAtlas: {},
      // 需要获取的文章数量(默认为首屏数量)
      articleNumber: 6,
      // 文章总数量
      articleCount: 0
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
    this.$axios.get('articles/getArticle?articleNumber=' + this.articleNumber).then(res => {
      console.log(res.data)
      this.homeAtlas = res.data
    }).catch(err => {
      console.log(err)
    })
    // 获取文章总数量，用于文章加载完之后提示用户
    this.$axios.get('/articles/getCount').then(res => {
      console.log(res.data)
      // 保存文章总数
      this.articleCount = res.data.articleCount
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    // 刷新iscroll方法，需要传递给子组件HomeStrategy
    refreshScroll () {
      // 刷新iscroll
      this.$emit('refreshScroll')
    },
    // 查看更多文章方法
    checkMore () {
      this.articleNumber += 6
      if (this.articleNumber > this.articleCount) {
        // 如果此时要获取的文章数量大于文章总数，那么获取全部文章
        this.articleNumber = this.articleCount
        this.$message({
          message: '所有攻略已加载完毕!',
          type: 'warning'
        })
      }
      this.$axios.get('articles/getArticle?articleNumber=' + this.articleNumber).then(res => {
        console.log(res.data)
        this.homeAtlas = res.data
      }).catch(err => {
        console.log(err)
      })
    }
  },
  watch: {
    // 监听获取到的页面滚动距离数据的变化
    scrollTop () {
      // 如果滚动距离大于banner加上内容头部的高度，这时开始改变个人面板的top值
      if (this.$store.state.currentScrollTop >= window.innerHeight + 65) {
        // 如果是向下滚动，且个人面板已经到底，就固定个人面板(通过不断改变个人面板的top值实现)
        if (this.$store.state.scrollDirection === 1 && this.mySelfTop >= (this.articleNumber - 2) * 250) {
          this.mySelfTop = (this.articleNumber - 2) * 250
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
  height: 100vh;
  background: url('./../assets/images/home.jpg') no-repeat;
  background-size: cover;
  position: relative;
  .title{
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
