<template>
  <div id="message">
    <!--留言展示区域-->
    <div class="message-area">
      <div class="message-content">
        <div class="message-box" @click="showMessage(item._id)" v-for="(item) in message" :key="item.id" :style="{transform: `rotateZ(${Math.floor(Math.random() * (20 - (-20) + 1)) - 20}deg)`}">
          <i class="iconfont icon-bianqianjia"></i>
          <img :src="item.user_avatar" alt="">
          <p>{{ item.messageContent | formatMessage }}</p>
        </div>
        <div class="load" @click="loadMore" v-show="messageTotalCount > 28 && loadShow">
          <span>加载更多>></span>
        </div>
      </div>
    </div>
    <!--留言写作区域-->
    <div class="operation">
      <div class="title">
        <h1>留言板</h1>
      </div>
      <div class="write">
        <textarea ref="textarea" cols="30" rows="10" v-model="messageContent" @focus="clearInfo" @blur="addInfo"></textarea>
        <button @click.prevent="saveMessage">留言</button>
      </div>
    </div>
    <!--留言具体信息展示区域-->
    <div class="specificMessage" v-show="specific">
      <div class="user-info">
        <img :src="specificMessage.user_avatar" alt="">
        <span>{{ specificMessage.user_name }}</span>
      </div>
      <div class="all-message">
        <p>{{ specificMessage.messageContent }}</p>
      </div>
      <div class="date">
        <span>{{ specificMessage.date }}</span>
      </div>
      <i class="iconfont icon-xianshi_quxiao" @click="closeMessage"></i>
    </div>
  </div>
</template>

<script>
import IScroll from 'iscroll-custom/build/iscroll-probe'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Message',
  data: function () {
    return {
      scroll: null,
      // 留言内容
      messageContent: '我需要你的反馈(不超过100字)...',
      // 当前需要获取的留言数量(一屏可以展示的留言数量为28)
      messageCount: 28,
      // 当前留言总数
      messageTotalCount: 0,
      // 加载更多按钮是否显示
      loadShow: true,
      // 留言信息
      message: {},
      // 具体某一条留言的信息
      specificMessage: {},
      // 具体某一条留言是否显示
      specific: false
    }
  },
  mounted () {
    // 刷新iscroll
    this.$emit('refreshScroll')

    // 获取当前留言总数
    this.$axios.get('/messages/getCount').then(res => {
      console.log(res.data)
      this.messageTotalCount = res.data.messageCount
    }).catch(err => {
      console.log(err)
    })

    // 获取当前屏需要展示的留言
    this.getMessage()
    // 创建iscroll对象
    this.scroll = new IScroll('.message-area', {
      mouseWheel: true, // 允许鼠标滚轮
      scrollbars: true, // 滚动条
      interactiveScrollbars: true, // 允许点击交互滚动条
      probeType: 3, // 像素级滚动监听
      disablePointer: true // 禁用鼠标拖动
    })
  },
  filters: {
    formatMessage (value) {
      if (value.length >= 21) {
        return value.slice(0, 21) + '...'
      } else {
        return value
      }
    }
  },
  methods: {
    // 保存留言
    saveMessage () {
      // 获取当前用户信息
      if (this.messageContent !== '我需要你的反馈(不超过100字)...' && this.messageContent.length !== 0) {
        this.$axios.get('users/current').then(currentUser => {
          console.log(currentUser.data)
          this.$axios.post('messages/saveMessage', {
            user_id: currentUser.data.id,
            // user_name: currentUser.data.name,
            // user_avatar: currentUser.data.avatar,
            messageContent: this.messageContent
          }).then(message => {
            console.log(message.data)
            this.$message({
              message: '留言成功！',
              type: 'success'
            })
            // 重置输入框状态
            this.messageContent = '我需要你的反馈(不超过100字)...'
            this.$refs.textarea.style = 'color: #cccccc'
            // 需要加载的留言加1
            this.messageCount += 1
            // 重新获取留言信息
            this.getMessage()
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 获取留言
    getMessage () {
      this.$axios.get('/messages/getMessage?messageNumber=' + this.messageCount).then(res => {
        console.log(res.data)
        this.message = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    // 展示某一条留言具体信息
    showMessage (messageID) {
      // 清空上一次留言信息
      this.specificMessage = {}
      // 显示留言框
      this.specific = true
      console.log(messageID)
      this.$axios.get('/messages/getOne?messageID=' + messageID).then(message => {
        console.log(message.data)
        this.specificMessage = message.data
        this.specificMessage.date = this.specificMessage.date.split('T')[0]
      }).catch(err => {
        console.log(err)
      })
    },
    // 关闭留言具体信息
    closeMessage () {
      this.specific = false
    },
    // 加载更多留言(当留言数量超过一屏显示的最大留言数量，提供加载更多按钮，加载更多留言)
    loadMore () {
      // 再次获取28条留言
      this.messageCount += 28
      if (this.messageCount >= this.messageTotalCount) {
        this.messageCount = this.messageTotalCount
        this.$message({
          message: '所有留言加载完成！',
          type: 'warning'
        })
        // 隐藏加载更多按钮
        this.loadShow = false
      }
      this.getMessage()
    },
    clearInfo () {
      if (this.messageContent === '我需要你的反馈(不超过100字)...') {
        this.messageContent = ''
        this.$refs.textarea.style = 'color: #000000'
      }
    },
    addInfo () {
      if (this.messageContent.length === 0) {
        this.messageContent = '我需要你的反馈(不超过100字)...'
        this.$refs.textarea.style = 'color: #cccccc'
      }
    }
  },
  watch: {
    message: function () {
      // 刷新scroll
      // console.log('异步刷新scroll')
      setTimeout(() => {
        this.scroll.refresh()
      }, 100)
    },
    messageContent: function (newValue, oldValue) {
      console.log(newValue)
      if (newValue.length > 100) {
        this.messageContent = oldValue
      }
    }
  }
}
</script>

<style scoped lang="scss">
  #message{
    width: 100vw;
    height: 100vh;
    background: url("./../assets/images/message.jpg") no-repeat;
    background-size: cover;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    .message-area{
      width: 970px;
      height: 90%;
      background-color: rgba(255, 255, 255, 0.5);
      position: relative;
      overflow: hidden;
      .message-content{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 20px;
        box-sizing: border-box;
        .message-box{
          width: 100px;
          height: 120px;
          background-color: rgba(255, 255, 255, 1);
          margin: 15px;
          font-size: 12px;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          cursor: pointer;
          transition: all 1s;
          padding: 3px;
          box-sizing: border-box;
          &:hover{
            transform: scale(1.2) !important;
          }
          i{
            position: absolute;
            left: -7px;
            top: -7px;
            font-size: 22px;
            color: #000000;
            font-weight: bolder;
          }
          img{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-bottom: 20px;
            align-self: flex-end;
          }
        }
      }
      .load{
        width: 100%;
        cursor: pointer;
        display: flex;
        align-self: center;
        justify-content: center;
        margin-top: 10px;
        span{
          display: inline-block;
          height: 40px;
          background-color: #fff;
          border-radius: 5px;
          text-align: center;
          line-height: 40px;
          padding: 3px;
        }
      }
    }
    .operation{
      width: 350px;
      height: 90%;
      background-color: rgba(255, 255, 255, 0.5);
      margin-left: 20px;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      .title{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        h1{
          font-size: 22px;
        }
      }
      .write{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 90%;
        textarea{
          width: 100%;
          border: none;
          outline: none;
          resize: none;
          padding: 10px;
          box-sizing: border-box;
          margin-bottom: 20px;
          color: #cccccc;
        }
        button{
          align-self: flex-end;
          width: 80px;
          height: 40px;
          border: none;
          cursor: pointer;
        }
      }
    }
    .specificMessage{
      width: 400px;
      height: 250px;
      background-color: rgba(92, 196, 223, 0.7);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 10px;
      box-sizing: border-box;
      .user-info{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 50px;
        img{
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      .date{
        align-self: flex-end;
        justify-self: flex-end;
      }
      i{
        position: absolute;
        top: 2px;
        right: 2px;
        cursor: pointer;
        font-size: 18px;
      }
    }
  }
</style>
