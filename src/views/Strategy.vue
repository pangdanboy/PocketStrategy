<template>
  <div id="strategy">
    <div class="content">
      <div class="content-in">
        <div class="title">
          <i class="iconfont icon-jinglingqiu"></i>
          <h2>{{ articleData.title }}</h2>
          <i class="iconfont icon-jinglingqiu"></i>
        </div>
        <div class="info">
          <div class="author">
            <span>作者：</span>
            <span>@拉吉莫拉拉</span>
          </div>
          <div class="textNumber">
            <span>正文字数：</span>
            <span>{{ articleData.textNumber }}</span>
          </div>
          <div class="date">
            <span>创作日期：</span>
            <span>{{ articleData.date }}</span>
          </div>
        </div>
        <div class="abstract">
          <p><span>摘要：</span>{{ articleData.abstract }}</p>
        </div>
        <div class="cover">
          <img :src="articleData.cover" alt="">
        </div>
        <div class="text">
          <p><span></span>{{ articleData.content }}</p>
        </div>
        <div class="support">
          <div class="icon">
            <i class="iconfont icon-dianzan"></i>
          </div>
          <div class="supportNumber">66</div>
        </div>
        <div class="comment"></div>
      </div>
    </div>
    <div class="panel">
      <Panel></Panel>
    </div>
  </div>
</template>

<script>
import IScroll from 'iscroll-custom/build/iscroll-probe'
import Panel from './../components/Panel'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Strategy',
  data: function () {
    return {
      // 页面滚动对象(iscroll)
      scroll: null,
      // 当前文章数据
      articleData: {}
    }
  },
  filters: {
    // formatDate: function (value) {
    //   return value.split('T')[0]
    // }
  },
  components: {
    Panel
  },
  created () {
    console.log(this.$route.query)
    // 根据路由传过来的文章id获取对应的文章信息
    this.$axios.get('articles/getOne?articleID=' + this.$route.query.articleID).then(res => {
      console.log(res.data)
      this.articleData = res.data
      this.articleData.date = this.articleData.date.split('T')[0]
      this.articleData.textNumber = this.articleData.content.length
    }).catch(err => {
      console.log(err)
    })
  },
  mounted () {
    // 刷新整体页面iscroll
    this.$emit('refreshScroll')
    // 创建当前content的iscroll对象
    this.scroll = new IScroll('.content', {
      mouseWheel: true, // 允许鼠标滚轮
      scrollbars: true, // 滚动条
      interactiveScrollbars: true, // 允许点击交互滚动条
      probeType: 3, // 像素级滚动监听
      disablePointer: true // 禁用鼠标拖动
    })
  }
}
</script>

<style scoped lang="scss">
  #strategy{
    width: 100vw;
    height: 100vh;
    background: url("../assets/images/editAtals.jpg") no-repeat;
    background-size: cover;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    .content{
      width: 800px;
      height: 600px;
      background-color: rgba(255, 255, 255, 0.8);
      margin-right: 20px;
      position: relative;
      overflow: hidden;
      margin-top: 50px;
      border-radius: 5px;
      .title{
        width: 90%;
        margin: 0 auto;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        i{
          font-size: 22px;
          animation: circle 1s infinite;
        }
        @keyframes circle {
          from {
            transform: rotateZ(0deg);
          }
          to{
            transform: rotateZ(360deg);
          }
        }
        h2{
          font-size: 22px;
          font-weight: bold;
          margin: 0 5px;
        }
      }
      .info{
        width: 90%;
        margin: 0 auto;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        div{
          margin: 0 15px;
        }
      }
      .abstract{
        width: 90%;
        margin: 10px auto;
        border: 1px dashed #000;
        padding: 10px;
      }
      .cover{
        width: 90%;
        margin: 0 auto;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 85%;
          height: 100%;
        }
      }
      .text{
        width: 90%;
        margin: 10px auto;
        border: 1px dashed #000;
        padding: 10px;
        p{
          span{
            display: inline-block;
            width: 32px;
          }
        }
      }
      .support{
        width: 95%;
        margin: 0 auto;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon{
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin-right: 3px;
          i{
            font-size: 36px;
          }
        }
        .supportNumber{
          font-size: 22px;
        }
      }
      .comment{
        width: 95%;
        margin: 0 auto;
        height: 100px;
        background-color: #fa0000;
       }
    }
    .panel{
      width: 300px;
      height: 600px;
      background-color: rgba(255, 255, 255, 0.8);
      margin-top: 50px;
      border-radius: 5px;
    }
    @media screen and (min-width: 1450px){
      .content{
        width: 1000px;
        height: 800px;
      }
    }
  }
</style>
