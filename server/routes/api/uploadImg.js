const express = require('express')
const router = express.Router()
// 引入multer
const multer = require('multer')

// 上传图片的方法
const storage = multer.diskStorage({
  // 存储位置
  destination: function (req, file, callback) {
    // 参数解释 param1:错误信息  param2:上传图片的服务端保存路径，注意这里的路径写法
    callback(null, './public/articleCover')
  },
  // 确定文件名,在这儿采用了时间戳和图片文件原名为上传的图片文件命名，可以保证名字不重复
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
// 得到multer对象
const upload = multer({ storage: storage })
// 路由接口
router.post('/imgUpload', upload.array('img', 1), (req, res) => {
  // 返回图片的地址
  const file = req.files
  console.log(file[0])
  //= ===此时，图片已经保存至我们的服务端了====
  const fileInfo = {}
  // 获取文件基本信息，封装好发送给前端
  fileInfo.type = file[0].mimetype
  fileInfo.name = file[0].originalname
  fileInfo.size = file[0].size
  fileInfo.path = 'public/articleCover/' + file[0].filename
  res.send({
    code: 0,
    value: '图片上传成功',
    data: fileInfo
  })
})

/**
 * 图片上传
 * @type {Router}
 */
module.exports = router
