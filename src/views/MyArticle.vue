<template>
  <div id="my_article">
    <Banner>
      <template #title>
        <p class="title">我的攻略</p>
      </template>
    </Banner>
    <Content>
      <template #content-in>
        <div class="content-in">
          <div class="default" v-show="myArticle.length === 0">
            <p>你还没有编写过攻略哦</p>
            <button @click.prevent="editAtlas">编写攻略>></button>
          </div>
          <div class="my-strategy" v-show="myArticle.length !== 0">
            <!--用户攻略展示-->
              <HomeStrategy v-for="(item, index) in myArticle" :key="item.articleID" :index="index" :item="item" @refreshScroll="refreshScroll">
                <template #operation>
                  <div class="leftOperation" v-show="(index + 1) % 2 !== 0">
                    <span @click="checkStrategy(item.articleID)">查看</span>
                    <span @click="delStrategy(item.articleID)">删除</span>
                  </div>
                  <div class="rightOperation" v-show="(index + 1) % 2 === 0">
                    <span @click="checkStrategy(item.articleID)">查看</span>
                    <span @click="delStrategy(item.articleID)">删除</span>
                  </div>
                </template>
              </HomeStrategy>
          </div>
        </div>
      </template>
    </Content>
  </div>
</template>

<script>
import Banner from '../components/Banner'
import Content from '../components/Content'
import HomeStrategy from '../components/HomeStrategy'
import router from '../router/index'
export default {
  name: 'MyArticle',
  mounted () {
    // 刷新iscroll
    this.$emit('refreshScroll')
    // 获取用户文章信息
    this.getUserArticle()
  },
  data: function () {
    return {
      // 当前用户编写文章数据
      myArticle: {}
    }
  },
  components: {
    Banner,
    Content,
    HomeStrategy
  },
  methods: {
    editAtlas () {
      // 跳转到文章编辑界面
      router.push('/EditStrategy')
    },
    getUserArticle () {
      // 根据当前登录用户信息获取用户编写攻略文章信息
      this.$axios.get('users/current').then(user => {
        // console.log(user.data)
        this.$axios.get('articles/getUserArticle?user_id=' + user.data.id).then(articles => {
          // console.log(articles.data)
          // 保存用户文章数据
          this.myArticle = articles.data
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 查看文章
    checkStrategy (articleID) {
      // 跳转到文章查看界面
      router.push('/Strategy/?articleID=' + articleID)
    },
    // 删除用户编写文章
    delStrategy (articleID) {
      this.$axios.delete('articles/delArticle?articleID=' + articleID).then(res => {
        // console.log(res.data)
        this.$message({
          message: '删除成功！',
          type: 'success'
        })
        // 重新加载用户文章信息
        this.getUserArticle()
      }).catch(err => {
        console.log(err)
      })
    },
    // 刷新iscroll方法，需要传递给子组件HomeStrategy
    refreshScroll () {
      // 刷新iscroll
      this.$emit('refreshScroll')
    }
  },
  watch: {
    myArticle: function () {
      // 文章数据发生变化异步刷新iscroll
      setTimeout(() => {
        this.refreshScroll()
      }, 200)
    }
  }
}
</script>

<style scoped lang="scss">
  #banner{
    height: 75vh;
    background: url('./../assets/images/myarticle.png') no-repeat;
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
    .content-in{
      display: flex;
      align-items: center;
      justify-content: center;
      .default{
        width: 100%;
        height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p{
          margin-bottom: 10px;
          font-size: 22px;
          color: rgba(0, 0, 0, 0.5);
        }
        button{
          width: 100px;
          height: 35px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          outline: none;
          background-color: rgba(255, 255, 255, 0.7);
        }
      }
      .my-strategy{
        width: 60%;
        .home-atlas{
          &:hover{
            .leftOperation{
              display: flex;
            }
            .rightOperation{
              display: flex;
            }
          }
        }
        .leftOperation{
          position: absolute;
          width: 50px;
          height: 70px;
          border-radius: 5px;
          overflow: hidden;
          background-color: rgba(255, 255, 255, 0.6);
          display: none;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          left: 140px;
          top: 50%;
          transform: translateY(-50%);
          transition: all 1s;
          span{
            display: inline-block;
            width: 50px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            &:hover{
              background-color: skyblue;
            }
          }
        }
        .rightOperation{
          position: absolute;
          width: 50px;
          height: 70px;
          border-radius: 5px;
          overflow: hidden;
          background-color: rgba(255, 255, 255, 0.6);
          display: none;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          right: 140px;
          top: 50%;
          transform: translateY(-50%);
          transition: all 1s;
          span{
            display: inline-block;
            width: 50px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            &:hover{
              background-color: skyblue;
            }
          }
        }
      }
    }
  }
</style>
