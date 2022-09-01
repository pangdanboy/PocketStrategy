<template>
  <div id="notice">
    <div class="icon">
      <span>公告</span>
      <i class="iconfont icon-laba"></i>
    </div>
    <div class="content">
      <p>网站初期工作大致完成，但是依然存在许多大大小小的问题，菜鸟站主会慢慢完善的，欢迎各位宝可梦训练家的到来！</p>
      <i class="iconfont icon-jinglingqiu"></i>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Notice'
}
</script>

<style scoped lang="scss">
  #notice{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .icon{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      span{
        margin-left: 50px;
        margin-right: 10px;
        font-size: 20px;
      }
      i{
        font-size: 22px;
        animation: bounce 1s infinite;
      }
      @keyframes bounce {
        from {
          transform: scale(1);
        }
        to{
          transform: scale(1.2);
        }
      }
    }
    .content{
      width: 75%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      p{
        margin-left: 10px;
      }
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
    }
  }
</style>
