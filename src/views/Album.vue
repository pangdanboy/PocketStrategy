<template>
  <div id="album">
    <Banner>
      <template #title>
        <p class="title">精选壁纸</p>
      </template>
    </Banner>
    <Content>
      <template #content-in>
        <div class="content-in">
          <div class="imageContainer">
            <div class="demo-image__preview">
              <el-image
                style="width: 240px; height: 180px; border-radius: 5px;"
                :src="url"
                :preview-src-list="srcList">
              </el-image>
            </div>
            <div class="demo-image__preview">
              <el-image
                style="width: 240px; height: 180px; border-radius: 5px;"
                :src="url"
                :preview-src-list="srcList">
              </el-image>
            </div>
            <div class="demo-image__preview">
              <el-image
                style="width: 240px; height: 180px; border-radius: 5px;"
                :src="url"
                :preview-src-list="srcList">
              </el-image>
            </div>
            <div class="demo-image__preview">
              <el-image
                style="width: 240px; height: 180px; border-radius: 5px;"
                :src="url"
                :preview-src-list="srcList">
              </el-image>
            </div>
            <div class="demo-image__preview">
              <el-image
                style="width: 240px; height: 180px; border-radius: 5px;"
                :src="url"
                :preview-src-list="srcList">
              </el-image>
            </div>
            <div class="demo-image__preview">
              <el-image
                style="width: 240px; height: 180px; border-radius: 5px;"
                :src="url"
                :preview-src-list="srcList">
              </el-image>
            </div>
            <div class="demo-image__preview">
              <el-image
                style="width: 240px; height: 180px; border-radius: 5px;"
                :src="url"
                :preview-src-list="srcList">
              </el-image>
            </div>
            <div class="demo-image__preview">
              <el-image
                style="width: 240px; height: 180px; border-radius: 5px;"
                :src="url"
                :preview-src-list="srcList">
              </el-image>
            </div>
            <div class="demo-image__preview">
              <el-image
                style="width: 240px; height: 180px; border-radius: 5px;"
                :src="url"
                :preview-src-list="srcList">
              </el-image>
            </div>
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
  name: 'Album',
  mounted () {
    // 刷新iscroll
    this.$emit('refreshScroll')
  },
  data: function () {
    return {
      // 壁纸专辑封面
      url: 'http://localhost:5000/public/wallpaper/cover1.jpg',
      // 壁纸图片地址
      srcList: [
        'http://localhost:5000/public/wallpaper/cover.jpg',
        'http://localhost:5000/public/wallpaper/cover1.jpg'
      ]
    }
  },
  components: {
    Banner,
    Content
  }
}
</script>

<style scoped lang="scss">
  #album{
    #banner{
      height: 80vh;
      background: url('./../assets/images/cover.jpg') no-repeat;
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
        .imageContainer{
          width: 1350px;
          padding: 20px;
          box-sizing: border-box;
          background-color: rgba(255, 255, 255, 0.7);
          border-radius: 15px;
          display: flex;
          flex-wrap: wrap;
          .demo-image__preview{
            margin: 0 22px 15px 0;
          }
        }
      }
    }
  }
</style>
