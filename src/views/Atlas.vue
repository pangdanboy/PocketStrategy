<template>
  <div id="atlas">
    <div class="atlas-container">
      <div class="atlas-list">
        <PreviewAtlas @showDrawer="showDrawer"></PreviewAtlas>
        <PreviewAtlas></PreviewAtlas>
        <PreviewAtlas></PreviewAtlas>
        <PreviewAtlas></PreviewAtlas>
        <PreviewAtlas></PreviewAtlas>
        <PreviewAtlas></PreviewAtlas>
        <PreviewAtlas></PreviewAtlas>
        <PreviewAtlas></PreviewAtlas>
        <PreviewAtlas></PreviewAtlas>
        <PreviewAtlas></PreviewAtlas>
        <PreviewAtlas></PreviewAtlas>
      </div>
    </div>
    <el-drawer
      style="padding-top: 50px"
      title="我是标题"
      :visible.sync="drawer"
      :direction="direction">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
import PreviewAtlas from './../components/PreviewAtlas'
import IScroll from 'iscroll-custom'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Atlas',
  data: function () {
    return {
      scroll: null,
      drawer: false,
      direction: 'rtl'
    }
  },
  mounted () {
    // 刷新iscroll
    this.$emit('refreshScroll')

    // 创建iscroll对象
    this.scroll = new IScroll('.atlas-container', {
      mouseWheel: true, // 允许鼠标滚轮
      scrollbars: true, // 滚动条
      interactiveScrollbars: true, // 允许点击交互滚动条
      probeType: 3, // 像素级滚动监听
      disablePointer: true // 禁用鼠标拖动
    })
  },
  methods: {
    showDrawer () {
      this.drawer = true
    }
  },
  components: {
    PreviewAtlas
  }
}
</script>

<style scoped lang="scss">
  #atlas{
    width: 100vw;
    height: 100vh;
    background: url("../assets/images/Atlas.png") no-repeat;
    background-size: cover;
    padding: 50px 20px 0px 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    .atlas-container{
      width: 100%;
      .atlas-list{
        margin: 0 auto;
        width: 1400px;
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
</style>
