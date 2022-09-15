<template>
  <div id="comment">
    <div class="user-info">
      <div class="user">
        <div class="avatar">
          <img :src="item.user_avatar" alt="">
        </div>
        <div class="name">@{{ item.user_name }}</div>
      </div>
      <div class="info">
        <span>{{ count-index }}楼</span>
        <span>{{ item.date | formatDate }}</span>
      </div>
    </div>
    <div class="comment-content">
      <p>{{ item.commentContent }}</p>
    </div>
    <!--扩展操作，点赞or回复-->
    <div class="operation"></div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Comment',
  data: function () {
    return {
    }
  },
  mounted () {
  },
  props: ['item', 'index', 'count'],
  filters: {
    formatDate: function (value) {
      if (value !== undefined) {
        return value.split('T')[0]
      }
    }
  }
}
</script>

<style scoped lang="scss">
  #comment{
    width: 90%;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 15px;
    .user-info{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      .user{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .avatar{
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background-color: #fff;
          margin-right: 5px;
          overflow: hidden;
          img{
            width: 35px;
            height: 35px;
          }
        }
      }
      .info{
        span{
          margin-right: 15px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
    .comment-content{
      padding: 5px;
    }
  }
</style>
