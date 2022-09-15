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
            <span>{{ articleData.author }}</span>
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
<!--        <div class="text">-->
<!--          <p><span></span>{{ articleData.content }}</p>-->
<!--        </div>-->
        <v-md-preview :text="articleData.content"></v-md-preview>
        <div class="support">
          <div class="icon" @click.once="support">
            <i class="iconfont icon-dianzan"></i>
          </div>
          <div class="supportNumber">{{ articleData.support }}</div>
        </div>
        <!--编辑评论-->
        <div class="editComment">
          <span>发表评论</span>
          <textarea cols="30" rows="10" v-model="commentContent" ref="textarea" @blur="addInfo" @focus="clear"></textarea>
          <button @click.prevent="comment">发布</button>
        </div>
        <!--评论展示-->
        <Comment v-for="(item, index) in comments" :key="item._id" :item="item" :index="index" :count="comments.length"></Comment>
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
import Comment from './../components/Comment'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Strategy',
  data: function () {
    return {
      // 页面滚动对象(iscroll)
      scroll: null,
      // 当前文章数据
      articleData: {},
      // 评论内容
      commentContent: '写下我想说的话...',
      // 当前文章评论数据
      comments: {}
    }
  },
  filters: {
    // formatDate: function (value) {
    //   return value.split('T')[0]
    // }
  },
  components: {
    Panel,
    Comment
  },
  mounted () {
    // 刷新整体页面iscroll
    this.$emit('refreshScroll')
    console.log(this.$route.query)
    // 根据路由传过来的文章id获取对应的文章信息
    this.$axios.get('articles/getOne?articleID=' + this.$route.query.articleID).then(res => {
      console.log(res.data)
      this.articleData = res.data
      // 处理获取的数据
      this.articleData.date = this.articleData.date.split('T')[0]
      this.articleData.textNumber = this.articleData.content.length
    }).catch(err => {
      console.log(err)
    })
    // 进入攻略文章页面获取文章的评论信息
    this.getComment()
    // 创建当前content的iscroll对象
    this.scroll = new IScroll('.content', {
      mouseWheel: true, // 允许鼠标滚轮
      scrollbars: true, // 滚动条
      interactiveScrollbars: true, // 允许点击交互滚动条
      probeType: 3, // 像素级滚动监听
      disablePointer: true // 禁用鼠标拖动
    })
  },
  methods: {
    // 文章点赞
    support () {
      this.$axios.put('/articles/support', {
        articleID: this.$route.query.articleID
      }).then(res => {
        console.log(res.data)
        this.articleData = res.data
        this.$message({
          message: '点赞成功',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 评论输入框获得焦点清除提示内容
    clear () {
      console.log('textarea获得焦点')
      if (this.commentContent === '写下我想说的话...') {
        this.commentContent = ''
        this.$refs.textarea.style = 'color: #000000'
      }
    },
    // 评论输入框失去焦点添加提示内容
    addInfo () {
      if (this.commentContent.length === 0) {
        this.commentContent = '写下我想说的话...'
        this.$refs.textarea.style = 'color: #cccccc'
      }
    },
    // 保存文章评论信息
    comment () {
      if (this.commentContent !== '写下我想说的话...' && this.commentContent.length > 0) {
        // 获取用户信息，把当前用户唯一标识id和其他信息存入评论信息中
        this.$axios.get('users/current').then(userInfo => {
          console.log(userInfo.data)
          // 保存评论信息
          this.$axios.post('comments/saveComment', {
            articleID: this.$route.query.articleID,
            user_id: userInfo.data.id,
            // user_name: userInfo.data.name,
            // user_avatar: userInfo.data.avatar,
            commentContent: this.commentContent
          }).then(comment => {
            console.log(comment)
            // 保存之后清空输入框评论
            this.commentContent = ''
            // 提示用户
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            // 用户评论后获取文章的评论信息
            this.getComment()
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 获取文章评论信息
    getComment () {
      // 进入攻略文章页面获取文章的评论信息
      this.$axios.get('comments/getComment?articleID=' + this.$route.query.articleID).then(res => {
        console.log(res.data)
        // 保存文章评论数据，渲染元素
        this.comments = res.data
      }).catch(err => {
        console.log(err)
      })
    }
  },
  watch: {
    comments: function () {
      // 刷新scroll
      // console.log('异步刷新scroll')
      setTimeout(() => {
        this.scroll.refresh()
      }, 100)
    },
    articleData: function () {
      // 刷新scroll
      // console.log('异步刷新scroll')
      setTimeout(() => {
        this.scroll.refresh()
      }, 100)
    }
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
        border: 2px dashed #000;
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
        border: 2px dashed #000;
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
        margin-bottom: 20px;
        border-bottom: 2px dashed #000000;
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
      .editComment{
        width: 95%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 20px;
        span{
          align-self: flex-start;
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        textarea{
          resize: none;
          width: 100%;
          height: 200px;
          outline: none;
          padding: 10px;
          box-sizing: border-box;
          margin-bottom: 10px;
          color: #cccccc;
        }
        button{
          align-self: flex-end;
          outline: none;
          border: none;
          width: 70px;
          height: 35px;
          cursor: pointer;
          font-weight: bold;
          border-radius: 5px;
          background-color: #fff;
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
