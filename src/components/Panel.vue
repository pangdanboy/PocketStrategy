<template>
  <div id="panel">
    <div class="avatar">
      <img src="./../assets/images/myPhoto.png" alt="">
    </div>
    <div class="game">
      <span>@拉吉莫拉拉</span>
      <span>渠道1946 闪光双倍多多冰</span>
    </div>
    <div class="web">
      <div class="github">
        <a href="https://github.com/pangdanboy" target="_blank">
          <img src="./../assets/images/github.png" alt="">
        </a>
      </div>
      <div class="qq">
        <img src="./../assets/images/qq.png" alt="" class="qqLink">
        <img src="./../assets/images/qq.jpg" alt="" class="qrCode">
      </div>
      <div class="wechat">
        <img src="./../assets/images/wechat.png" alt="" class="wechatLink">
        <img src="./../assets/images/wechat.jpg" alt="" class="qrCode">
      </div>
    </div>
    <div class="say">
    </div>
    <div class="tools">
      <span>好玩的网站</span>
      <div class="webStorage">
        <a href="https://www.html5iq.com/index.html" target="_blank">
          <img src="./../assets/images/webStorage.png" alt="">
        </a>
      </div>
      <div class="pokemon">
        <a href="https://wiki.52poke.com/wiki/%E4%B8%BB%E9%A1%B5" target="_blank">
          <img src="./../assets/images/pokemon.png" alt="">
        </a>
      </div>
      <div class="freshBg">
        <a href="https://webgradients.com/" target="_blank">
          <img src="./../assets/images/freshBg.png" alt="">
        </a>
      </div>
      <div class="zhaotaici">
        <a href="https://zhaotaici.cn/##" target="_blank">
          <img src="./../assets/images/zhaotaici.png" alt="">
        </a>
      </div>
      <div class="animate">
        <a href="https://sketch.metademolab.com/" target="_blank">
          <img src="./../assets/images/animate.png" alt="">
        </a>
      </div>
      <div class="polebrief">
        <a href="https://www.polebrief.com/index" target="_blank">
          <img src="./../assets/images/polebrief.png" alt="">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Panel'
}
</script>

<style scoped lang="scss">
  #panel{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 20px;
    div{
      margin-bottom: 20px;
      display: flex;
      border-radius: 10px;
      background-color: rgba(255, 255, 255);
    }
    .avatar{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      img{
        width: 50px;
        height: 50px;
      }
    }
    .game{
      width: 80%;
      height: 50px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .web{
      width: 80%;
      height: 80px;
      align-items: center;
      justify-content: center;
      div{
        width: 45px;
        height: 45px;
        margin: 0 15px 0 15px;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 35px;
          height: 35px;
          cursor: pointer;
        }
      }
      .qq, .wechat{
        position: relative;
        .qrCode{
          position: absolute;
          width: 100px;
          height: 100px;
          left: 50%;
          bottom: 50px;
          transform: translate(-50%);
          display: none;
        }
        &:hover{
          .qrCode{
            display: block;
          }
        }
      }
    }
    .say{
      width: 80%;
      height: 80px;
      flex-direction: column;
      p{
        width: 100%;
      }
    }
    .tools{
      width: 80%;
      height: 200px;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      span{
        width: 100%;
        text-align: center;
        line-height: 25px;
        border-bottom: 1px dashed #000000;
      }
      div{
        width: 60px;
        height: 60px;
        margin: 0;
        border-radius: 50%;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        margin: 0 5px;
        &:hover{
          img{
            transform: scale(1.2);
          }
        }
        img{
          width: 40px;
          height: 40px;
          transition: all 1s;
        }
      }
    }
  }
</style>
