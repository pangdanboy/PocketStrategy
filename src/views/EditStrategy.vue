<template>
  <div id="edit_atlas">
    <div class="edit-atlas">
      <div class="title">
        <span>标题:</span>
        <input type="text" v-model="title">
      </div>
      <div class="abstract">
        <span>摘要:</span>
        <textarea v-model="abstract" ref="textarea" cols="30" rows="3" @focus="clear" @blur="addInfo"></textarea>
      </div>
      <div class="content">
        <span>内容:</span>
        <textarea name="" id="" cols="30" rows="10" v-model="content"></textarea>
      </div>
      <div class="cover-submit">
        <div class="cover">
          <span>攻略文章封面:</span>
          <el-upload
            :action="reqUrl"
            list-type="picture-card"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            name="img"
            :headers="headers"
            class="uploadImg"
          >
            <!--如果上传成功，后端会传来一个路径，将这个路径动态绑定，便可以显示你上传的图片-->
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="submit">
          <input type="submit" @click.prevent="release" value="发布">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from './../router/index'
export default {
  name: 'EditStrategy',
  data: function () {
    return {
      title: '',
      abstract: '大致描述一下你将要书写的攻略内容',
      content: '',
      // 设置请求头
      headers: { enctype: 'multipart/form-data' },
      // 上传成功之后返回的图片路径
      imageUrl: '',
      reqUrl: 'http://localhost:5000/api/uploadImg/imgUpload'
    }
  },
  mounted () {
    // 刷新iscroll
    this.$emit('refreshScroll')
  },
  methods: {
    clear () {
      console.log('textarea获得焦点')
      if (this.abstract === '大致描述一下你将要书写的攻略内容') {
        this.abstract = ''
        this.$refs.textarea.style = 'color: #000000'
      }
    },
    addInfo () {
      if (this.abstract.length === 0) {
        this.abstract = '大致描述一下你将要书写的攻略内容'
        this.$refs.textarea.style = 'color: #cccccc'
      }
    },
    // 上传成功之后的回调
    handleAvatarSuccess (res) {
      // res这个参数自己打印出来一看便知，在此不做解释
      console.log(res)
      // 将后端发送的地址赋值到我们需要显示的img中的src动态绑定的参数中
      this.imageUrl = 'http://localhost:5000/' + res.data.path
    },
    // 判断上传的图片大小是否满足要求
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt3M = file.size / 1024 / 1024 / 1024 < 3
      if (!isJPG && !isPNG) {
        this.$message.error`在这里插入代码片`('上传头像图片只能是 JPG 格式或 png 格式!')
      }
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!')
      }
      return isJPG && isLt3M
    },
    // 发布攻略
    release () {
      if (this.title.length === 0) {
        this.$message({
          message: '标题不能为空',
          type: 'warning'
        })
      } else if (this.abstract.length === 0 || this.abstract === '大致描述一下你将要书写的攻略内容') {
        this.$message({
          message: '摘要不能为空',
          type: 'warning'
        })
      } else if (this.content.length === 0) {
        this.$message({
          message: '内容不能为空',
          type: 'warning'
        })
      } else {
        this.$axios.post('articles/article', {
          title: this.title,
          abstract: this.abstract,
          content: this.content,
          cover: this.imageUrl || ''
        }).then(res => {
          console.log(res.data)
          // 清空内容或者设置默认值
          this.title = ''
          this.abstract = '大致描述一下你将要书写的攻略内容'
          this.content = ''
          this.imageUrl = ''
          this.$message({
            message: '发布成功',
            type: 'success'
          })
          router.push('/home')
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  #edit_atlas{
    width: 100vw;
    height: 100vh;
    background: url('./../assets/images/editAtals.jpg') no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    .edit-atlas{
      width: 75vw;
      height: 550px;
      background-color: rgba(255, 255, 255, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding-top: 10px;
      box-sizing: border-box;
      div{
        width: 90%;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .title{
        height: 50px;
        span{
          font-size: 22px;
          font-weight: bolder;
          margin-left: 20px;
          margin-right: 20px;
        }
        input{
          width: 88%;
          height: 40px;
          border: none;
          outline: none;
          font-size: 22px;
          padding: 5px;
          box-sizing: border-box;
        }
      }
      .abstract{
        height: 80px;
        span{
          font-size: 22px;
          font-weight: bolder;
          margin-left: 20px;
          margin-right: 20px;
        }
        textarea{
          outline: none;
          resize: none;
          width: 88%;
          height: 90%;
          border: none;
          padding: 10px;
          box-sizing: border-box;
          color: #cccccc;
        }
      }
      .content{
        height: 250px;
        span{
          font-size: 22px;
          font-weight: bolder;
          margin-left: 20px;
          margin-right: 20px;
        }
        textarea{
          outline: none;
          resize: none;
          width: 88%;
          border: none;
          padding: 10px;
          box-sizing: border-box;
          color: #000000;
        }
      }
      .cover-submit{
        height: 120px;
        margin: 0;
        .cover{
          width: 80%;
          margin: 0;
          span{
            font-size: 22px;
            font-weight: bolder;
            margin-left: 20px;
            margin-right: 20px;
          }
          .uploadImg{
            width: 100px;
            height: 100px;
            margin: 0;
            ::v-deep .el-upload--picture-card{
              width: 100px;
              height: 100px;
              position: relative;
              i{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
              }
            }
          }
          img{
            width: 100%;
            height: 100%;
          }
        }
        .submit{
          width: 100px;
          margin: 0;
          input{
            width: 100px;
            height: 40px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
        }
      }
    }
    @media screen and (min-width: 1450px){
      .edit-atlas{
        height: 700px;
        padding-top: 20px;
        div{
          margin-bottom: 20px;
        }
        .title{
          height: 70px;
        }
        .abstract{
          height: 90px;
        }
        .content{
          height: 300px;
        }
        .cover{
          height: 140px;
        }
      }
    }
    @media screen and (max-width: 1200px){
      .edit-atlas{
        div{
          span{
            font-size: 18px !important;
          }
        }
        .title{
          input{
            width: 85%;
          }
        }
        .abstract{
          textarea{
            width: 85%;
          }
        }
        .content{
          textarea{
            width: 85%;
          }
        }
      }
    }
    @media screen and (max-width: 820px){
      .edit-atlas{
        div{
          span{
            font-size: 16px !important;
          }
        }
        .title{
          input{
            width: 80%;
          }
        }
        .abstract{
          textarea{
            width: 80%;
          }
        }
        .content{
          textarea{
            width: 80%;
          }
        }
      }
    }
  }
</style>
