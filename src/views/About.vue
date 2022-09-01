<template>
  <div id="about">
    <Banner>
      <template #title>
        <p class="title">关于本人</p>
      </template>
    </Banner>
    <Content>
      <template #content-in>
        <div class="content-in">
          <div class="photo" >
            <img src="./../assets/images/myAvatar.png" alt="">
          </div>
          <div class="info">
            <p>{{ info }}</p>
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
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'About',
  data: function () {
    return {
      myPhoto: '',
      info: '本科软件工程准大四学生，方向web前端，正在找实习中，感觉没人要了，哈哈哈。此网站为手游口袋觉醒游戏个人攻略，欢迎各位喜欢宝可梦的朋友来到这里，和大家一起参与讨论'
    }
  },
  components: {
    Banner,
    Content
  },
  mounted () {
    // 刷新iscroll
    this.$emit('refreshScroll')
  }
}
</script>

<style scoped lang="scss">
  #banner{
  width: 100%;
  height: 80vh;
  background: url('./../assets/images/about.jpg') no-repeat;
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
    height: 500px;
    background: linear-gradient(to right bottom,rgba(255,255,255,0.8),rgba(255,255,255,0.3));
    margin: 0 auto;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 35px;
    .photo{
      width: 75px;
      height: 75px;
      border-radius: 50%;
      margin-bottom: 50px;
      img{
        width: 75px;
        height: 75px;
        border-radius: 50%;
      }
    }
    .info{
      width: 360px;
      height: 285px;
      p{
        font-size: 18px;
        line-height: 32px;
      }
    }
  }
</style>
