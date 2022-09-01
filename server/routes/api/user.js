// @login && register
const express = require('express')
const bcrypt = require('bcrypt')
// eslint-disable-next-line no-unused-vars
const gravatar = require('gravatar')
const router = express.Router()
const jwt = require('jsonwebtoken')
const keys = require('./../../config/keys')
const passport = require('passport')

// 数据对象
const User = require('./../../models/users')

// $router  GET  api/user/test
// @desc    返回请求的json数据
// @access  public
router.get('/test', (req, res) => {
  res.json({
    msg: 'login works'
  })
})

// $router  POST  api/users/register
// @desc    返回请求的json数据
// @access  public
router.post('/register', (req, res) => {
  // console.log(req.body);
  // 查询数据库中拥有当前注册的邮箱
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.json({ code: 400, email: '邮箱已被注册！' })
    } else {
      // 创建一个全球公认的头像
      // const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' })
      // const avatar = './assets/images/myPhoto.png'
      // eslint-disable-next-line node/handle-callback-err
      User.find().count((err, userCount) => {
        if (!err) {
          // 创建用户默认用户名
          const username = '宝可梦训练家' + userCount
          // 创建新的用户
          const newUser = new User({
            name: username,
            email: req.body.email,
            password: req.body.password,
            avatar: '',
            // admin: true,
            user_info: '',
            user_web: ''
          })
          // 加密用户密码
          // eslint-disable-next-line node/handle-callback-err
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
              // Store hash in your password DB.
              if (err) throw err
              newUser.password = hash
              // 保存加密后的用户
              newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err))
            })
          })
        }
      })
    }
  })
})

// $route POST api/user/login
// @desc 返回token jwt passport
// @access public
router.post('/login', (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const email = req.body.email
  // eslint-disable-next-line no-unused-vars
  const password = req.body.password
  // 查询数据库
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.json({ code: 404, email: '用户不存在！' })
    }
    // 密码匹配，当前前端传入密码与找到用户的密码进行匹配
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // jwt.sign('规则','加密名字','过期时间','回调函数')
        // eslint-disable-next-line no-unused-vars
        const rule = { id: user.id, name: user.name }
        // eslint-disable-next-line node/handle-callback-err
        jwt.sign(rule, keys.secretOrkey, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err
          res.json({
            code: 200,
            success: true,
            admin: user.admin || false,
            token: 'Bearer ' + token
          })
        })
      } else {
        return res.json({ code: 400, password: '密码错误！' })
      }
    })
  })
})

// $route GET api/user/current
// @desc 返回current user
// @access private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    avatar: req.user.avatar,
    name: req.user.name,
    admin: req.user.admin || false,
    email: req.user.email,
    user_info: req.user.user_info,
    user_web: req.user.user_web
  })
})

// $route put api/user/edit
// @desc 返回修改结果 user
// @access private
router.put('/edit', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req.body.name)
  console.log(req.body.user_info)
  console.log(req.body.user_web)
  // 当前需要修改信息的用户
  const user = req.user
  user.name = req.body.name
  user.user_info = req.body.user_info
  user.user_web = req.body.user_web
  user.save()
  return res.json({ code: 200 })
})
// $route put api/user/editEmail
// @desc 返回修改结果 user
// @access private
router.put('/editEmail', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req.body.email)
  // 修改之后的邮箱
  const email = req.body.email
  // 当前需要修改邮箱的用户
  const currentUser = req.user
  // 查找用户表中是否存在当前需要绑定的邮箱
  User.findOne({ email }).then(user => {
    if (user) {
      return res.json({ code: 400, email: '邮箱已被绑定' })
    }
    currentUser.email = req.body.email
    currentUser.save()
    return res.json({ code: 200 })
  })
})

module.exports = router
