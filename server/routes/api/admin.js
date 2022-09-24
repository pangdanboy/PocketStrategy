const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const jwt = require('jsonwebtoken')
const keys = require('./../../config/keys')
const passport = require('passport')

// 数据对象
const Admin = require('./../../models/admin')

// $router  GET  api/admin/findSuper
// @desc    判断是否初始化超级管理员
// @access  public
router.get('/findSuper', (req, res) => {
  Admin.findOne({ adminLevel: 'super' }).then(admin => {
    if (admin) {
      return res.json({ code: 200, admin: '超级管理员已经初始化' })
    }
    return res.json({ code: 404, admin: '超级管理员未初始化' })
  }).catch(err => {
    console.log(err)
  })
})

// $router  POST  api/admin/initSuperAdmin
// @desc    初始化超级管理员信息
// @access  public
router.post('/initSuperAdmin', (req, res) => {
  const newAdmin = new Admin({
    email: req.body.email,
    password: req.body.password,
    adminLevel: 'super'
  })
  // 加密用户密码
  // eslint-disable-next-line node/handle-callback-err
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newAdmin.password, salt, function (err, hash) {
      // Store hash in your password DB.
      if (err) throw err
      newAdmin.password = hash
      // 保存加密后的用户
      newAdmin.save()
        .then(admin => res.json({ code: 200, msg: 'superAdminInit' }))
        .catch(err => console.log(err))
    })
  })
})

// $router  POST  api/admin/login
// @desc    管理员登录，返回身份令牌(token)
// @access  public
router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  Admin.findOne({ email: email }).then(admin => {
    if (!admin) {
      return res.json({ code: 404, username: '用户不存在！' })
    }
    bcrypt.compare(password, admin.password).then((isMatch) => {
      if (isMatch) {
        // 定义token规则
        const rule = { id: admin.id, adminLevel: admin.adminLevel }
        // 生成管理员身份令牌
        // eslint-disable-next-line node/handle-callback-err
        jwt.sign(rule, keys.secretOrkey, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err
          res.json({
            code: 200,
            success: true,
            adminLevel: admin.adminLevel,
            token: 'Bearer ' + token
          })
        })
      } else {
        return res.json({ code: 400, password: '密码错误！' })
      }
    }).catch(err => {
      console.log(err)
    })
  })
})

// $route GET api/admin/current
// @desc 返回current admin
// @access private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    adminLevel: req.user.adminLevel
  })
})
module.exports = router
