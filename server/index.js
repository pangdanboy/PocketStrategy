const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
// eslint-disable-next-line no-unused-vars
const passport = require('passport')
const app = express()

// 解决跨域问题
// 请求地址白名单
const whiteList = ['http://localhost:8080', 'http://localhost:8081']
// 判断当前origin是否包含在白名单中
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('not allow by cors'))
    }
  }
}
app.use(cors(corsOptions))

// 引入users.js
const users = require('./routes/api/user')
// 引入verifyCode.js
const verifyCode = require('./routes/api/verifyCode')
// 引入uploadImg.js
const uploadImg = require('./routes/api/uploadImg')
// 引入uploadImg.js
const article = require('./routes/api/article')
// 引入comment.js
const comment = require('./routes/api/comment')
// 引入message.js
const message = require('./routes/api/message')
// 引入admin.js
const admin = require('./routes/api/admin')

// DB config
const db = require('./config/keys').mongoURI
// 连接 mongodb
mongoose.connect(db).then(() => {
  console.log('MongoDB Connected')
}).catch((err) => {
  console.log(err)
})

// 初始化passport
app.use(passport.initialize())
// 配置passport
require('./config/passport')(passport)

// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 配置静态托管，将用户上传的静态资源暴露出去
app.use('/public/articleCover', express.static('./public/articleCover'))
app.use('/public/userAvatar', express.static('./public/userAvatar'))
app.use('/public/wallpaper', express.static('./public/wallpaper'))

// 请求测试
app.get('/', (req, res) => {
  res.end('hello world')
})
// 使用routes
app.use('/api/users', users)
app.use('/api/verifyCode', verifyCode)
app.use('/api/uploadImg', uploadImg)
app.use('/api/articles', article)
app.use('/api/comments', comment)
app.use('/api/messages', message)
app.use('/api/admin', admin)

// 端口配置
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log('server running at ' + port)
})
