<template>
  <div id="preview_atlas">
    <div class="looks">
      <img src="./../assets/images/zeraora.png" alt="">
      <div class="poke-ball" :class="openClass">
        <div class="poke-ball-up"></div>
        <div class="poke-ball-middle">
          <span @click="open"></span>
        </div>
        <div class="poke-ball-down"></div>
      </div>
    </div>
    <div class="name-attr">
      <div class="name">
        <p>捷拉奥拉</p>
        <p>电系</p>
      </div>
      <div class="position">
        <span>定位</span>
        <p>断风的闪电&雷影协战</p>
      </div>
    </div>
    <div class="story">
      <button @click.prevent="showDrawer">点击查看背景故事</button>
    </div>
    <div class="info">
      <div class="type">分类：奔雷宝可梦</div>
      <div class="self-value">种族值：600</div>
      <div class="hp">生命：88</div>
      <div class="special-attack">特攻：102</div>
      <div class="material-attack">物攻：112</div>
      <div class="speed">速度：143</div>
      <div class="special-prevention">特防：80</div>
      <div class="material-prevention">物防：75</div>
      <div class="collect">收集加成：速度 +1%</div>
      <div class="tall">身高：1.5m</div>
      <div class="weight">体重：44.5kg</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviewAtlas',
  mounted () {
    // 刷新iscroll
    this.$emit('refreshScroll')
  },
  data: function () {
    return {
      openShow: false,
      openClass: ''
    }
  },
  methods: {
    open () {
      this.openShow = !this.openShow
      this.openClass = this.openShow ? 'open' : ''
    },
    showDrawer () {
      this.$emit('showDrawer')
    }
  }
}
</script>

<style scoped lang="scss">
  #preview_atlas{
    width: 420px;
    height: 320px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    position: relative;
    margin-right: 35px;
    margin-bottom: 20px;
    .looks{
      width: 220px;
      height: 220px;
      border-radius: 50%;
      overflow: hidden;
      background-color: rgba(255, 255, 255, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .poke-ball{
        width: 220px;
        height: 220px;
        border-radius: 50%;
        position: absolute;
        background-color: #000000;
        transition: all 1s 2s;
        &.open{
          background-color: transparent;
          .poke-ball-up{
            transform: translateY(-101px);
          }
          .poke-ball-middle{
            background-color: transparent;
            border: none;
            span{
              transition: all 1s 1s;
              background-color: transparent;
              box-shadow: none;
            }
          }
          .poke-ball-down{
            transform: translateY(101px);
          }
        }
        .poke-ball-up{
          width: 220px;
          height: 100px;
          background-color: red;
          position: absolute;
          left: 0;
          top: 0;
          transition: all 1s;
        }
        .poke-ball-middle{
          width: 70px;
          height: 70px;
          border-radius: 50%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-color: #ffffff;
          border: 10px solid #000;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 1s 1s;
          &:hover{
            span{
              display: inline-block;
              background-color: #ffffff;
              box-shadow: 0px -5px 10px 0px #cccccc,
              -6px 0px 6px 0px #cccccc,
              6px 0px 6px 0px #cccccc,
              0px 5px 19px 0px #cccccc;
            }
          }
          span{
            display: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 14px;
            transition: all 1s;
            &:hover{
              transform: scale(1.1);
            }
          }
        }
        .poke-ball-down{
          width: 220px;
          height: 100px;
          background-color: #fff;
          position: absolute;
          left: 0;
          bottom: 0;
          transition: all 1s;
        }
      }
      &:hover{
        img{
          transform: scale(1.1);
        }
      }
      img{
        width: 100%;
        height: 100%;
        transition: all 1s;
      }
    }
    .name-attr{
      position: absolute;
      left: 20px;
      top: 5px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      .name{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2px;
        p{
          margin-right: 10px;
          font-weight: bolder;
          &:last-child{
            background-color: rgb(244, 210, 60);
            font-size: 12px;
            padding: 2px;
            box-sizing: border-box;
            border-radius: 5px;
            font-weight: normal;
          }
        }
      }
      .position{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        span{
          background-color: rgb(138, 216, 251);
          margin-right: 10px;
          padding: 2px;
          box-sizing: border-box;
          border-radius: 5px;
        }
        p{
          font-size: 12px;
        }
      }
    }
    .story{
      position: absolute;
      bottom: 5px;
      left: 60px;
      button{
        height: 30px;
        border: none;
        outline: none;
        cursor: pointer;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.7);
      }
    }
    .info{
      width: 180px;
      align-self: flex-start;
      display: flex;
      flex-direction: column;
      padding-top: 20px;
      font-size: 14px;
      div{
        margin-bottom: 6px;
      }
      .type{
        margin-left: 7px;
      }
      .self-value{
        margin-left: 15px;
      }
      .hp{
        margin-left: 27px;
      }
      .special-attack{
        margin-left: 36px;
      }
      .material-attack{
        margin-left: 45px;
      }
      .speed{
        margin-left: 54px;
      }
      .special-prevention{
        margin-left: 45px;
      }
      .material-prevention{
        margin-left: 36px;
      }
      .collect{
        margin-left: 27px;
      }
      .tall{
        margin-left: 18px;
      }
      .weight{
        margin-left: 9px;
      }
      .attr{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        img{
          width: 16px;
          height: 16px;
        }
      }
    }
  }
</style>
