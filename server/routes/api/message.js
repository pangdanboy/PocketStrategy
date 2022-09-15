const express = require('express')

const passport = require('passport')

const router = express.Router()

const Message = require('./../../models/messages')
const User = require('./../../models/users')

// $router  POST  api/messages/saveMessage
// @desc    保存新增的留言信息
// @access  private
router.post('/saveMessage', passport.authenticate('jwt', { session: false }), (req, res) => {
  const newMessage = new Message({
    user_id: req.body.user_id,
    // user_name: req.body.user_name,
    // user_avatar: req.body.user_avatar,
    messageContent: req.body.messageContent
  })
  // 获取留言对应的用户信息
  User.findOne({ _id: newMessage.user_id }).then(user => {
    newMessage.user_name = user.name
    newMessage.user_avatar = user.avatar
    newMessage.save().then(message => {
      res.json(message)
    }).catch(err => {
      console.log(err)
    })
  }).catch(err => {
    console.log(err)
  })
})

// $router  GET  api/articles/getCount
// @desc    返回当前留言总数
// @access  public
router.get('/getCount', (req, res) => {
  // 获取当前没有获取过的最后六条数据
  Message.find().count((err, count) => {
    if (!err) {
      res.json({ messageCount: count })
    }
  })
})
// $router  GET  api/messages/getMessage
// @desc    获取的留言信息
// @access  public
router.get('/getMessage', (req, res) => {
  Message.find().count((err, count) => {
    if (!err) {
      let messageNumber = req.query.messageNumber
      if (messageNumber > count) {
        messageNumber = count
      }
      // 获取当前没有获取过的最后的指定条数数据
      Message.find().sort({ $natural: -1 }).limit(messageNumber).then(messages => {
        // 更新留言对应用户信息
        messages.forEach((item, index) => {
          // console.log(item.user_id)
          // 更新每条留言对应的用户信息
          User.findOne({ _id: item.user_id }).then(user => {
            messages[index].user_name = user.name
            messages[index].user_avatar = user.avatar
            messages[index].save()
          }).catch(err => {
            console.log(err)
          })
        })
        res.json(messages)
      }).catch(err => {
        console.log(err)
      })
    }
  })
})

// $router  GET  api/messages/getOne
// @desc    获取的留言信息
// @access  public
router.get('/getOne', (req, res) => {
  const messageID = req.query.messageID
  Message.findOne({ _id: messageID }).then(message => {
    res.json(message)
  }).catch(err => {
    console.log(err)
  })
})

module.exports = router
