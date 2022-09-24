<template>
  <div id="news">
    <Banner>
      <template #title>
        <p class="title">新闻中心</p>
      </template>
    </Banner>
    <Content>
      <template #content-in>
        <div class="content-in">
          <previewNews></previewNews>
          <previewNews></previewNews>
          <previewNews></previewNews>
          <previewNews></previewNews>
        </div>
      </template>
    </Content>
  </div>
</template>

<script>
import Banner from './../components/Banner'
import Content from './../components/Content'
import previewNews from '../components/previewNews'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'News',
  mounted () {
    // 刷新iscroll
    this.$emit('refreshScroll')
  },
  data: function () {
    return {
    }
  },
  components: {
    Banner,
    Content,
    previewNews
  }
}
</script>

<style scoped lang="scss">
  #news{
    #banner{
      height: 65vh;
      background: url('./../assets/images/news.png') no-repeat;
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
    #content{
      display: flex;
      align-items: center;
      justify-content: center;
      .content-in{
        width: 75%;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 15px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: flex-start;
        padding-top: 20px;
      }
    }
  }
</style>
