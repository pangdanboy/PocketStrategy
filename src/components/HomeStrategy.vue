<template>
  <div class="home-atlas">
    <div class="oddLeft" v-show="(index+1) % 2 !== 0">
      <img :src="item.cover" alt="">
    </div>
    <div class="right">
      <div class="title">
        <h3>
          <b>【</b>
          <span>{{ item.title }}</span>
          <b>】</b>
        </h3>
        <span>@拉吉莫拉拉</span>
        <b class="line"></b>
      </div>
      <div class="abstract">
        <p ref="abstract">{{ item.abstract | formatAbstract }}</p>
      </div>
      <div class="date">
        <span v-show="(index+1) % 2 === 0">{{ item.date | formatDate }}</span>
        <span v-show="(index+1) % 2 !== 0">{{ item.date | formatDate }}</span>
      </div>
    </div>
    <div class="evenLeft" v-show="(index+1) % 2 === 0">
      <img :src="item.cover" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeStrategy',
  props: ['item', 'index'],
  filters: {
    formatDate: function (value) {
      if (value !== undefined) {
        return value.split('T')[0]
      }
    },
    formatAbstract: function (value) {
      if (value.length >= 150) {
        return value.slice(0, 150) + '...'
      } else {
        return value
      }
    }
  },
  mounted () {
    // 刷新iscroll
    this.$emit('refreshScroll')
  }
}
</script>

<style scoped lang="scss">
  .home-atlas{
    width: 100%;
    height: 250px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover{
      .oddLeft{
        img{
          transform: scale(1.2);
        }
      }
      .evenLeft{
        img{
          transform: scale(1.2);
        }
      }
    }
    .oddLeft, .evenLeft{
      width: 35%;
      height: 100%;
      border-bottom-left-radius: 20px;
      border-top-left-radius: 20px;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
        transition: all 1s;
      }
    }
    .evenLeft{
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
      border-bottom-right-radius: 20px;
      border-top-right-radius: 20px;
    }
    .right{
      width: 65%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .title{
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
        .line{
          width: 90%;
          height: 1px;
          border-bottom: 1px dashed #000000;
        }
      }
      .abstract{
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        margin: 10px 0px 15px 0px;
        p{
          width: 90%;
        }
      }
      .date{
        width: 90%;
        height: 50px;
        border-top: 1px dashed #000000;
        position: relative;
        span{
          position: absolute;
          &:nth-child(1){
            left: 0;
            top: 10px;
          }
          &:nth-child(2){
            right: 0;
            top: 10px;
          }
        }
      }
    }
  }
</style>
