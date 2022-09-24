<template>
  <div id="preview_news">
    <i class="iconfont icon-jinglingqiu"></i>
    <div class="news-title">
      <h3>版本更新！电系神兽捷拉奥拉来袭！版本更新！电系神兽捷拉奥拉来袭！版本更新！版本更新！版本更新！版本</h3>
    </div>
    <div class="date">
      <span>2022-2-22</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'previewNews'
}
</script>

<style scoped lang="scss">
  #preview_news{
    width: 85%;
    height: 100px;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 20px;
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px 20px;
    i{
      position: absolute;
      font-size: 20px;
      left: 5px;
      top: 5px;
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
    .news-title{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      h3{
        font-size: 22px;
      }
    }
    .date{
      align-self: flex-end;
    }
  }
</style>
