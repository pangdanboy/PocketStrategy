const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

// 解决跨域问题
app.use(cors({ origin: 'http://localhost:8080' }))

// eslint-disable-next-line no-unused-vars
const passport = require('passport')

// 引入users.js
const users = require('./routes/api/user')
// 引入verifyCode.js
const verifyCode = require('./routes/api/verifyCode')
// 引入uploadImg.js
const uploadImg = require('./routes/api/uploadImg')
// 引入uploadImg.js
const article = require('./routes/api/article')

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

// 请求测试
app.get('/', (req, res) => {
  res.end('hello world')
})
// 使用routes
app.use('/api/users', users)
app.use('/api/verifyCode', verifyCode)
app.use('/api/uploadImg', uploadImg)
app.use('/api/articles', article)

// 端口配置
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log('server running at ' + port)
})
