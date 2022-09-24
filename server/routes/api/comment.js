const express = require('express')
const router = express.Router()
const passport = require('passport')

const Comment = require('./../../models/comments')
const User = require('./../../models/users')

// $router  POST  api/comments/saveComment
// @desc    保存新增的评论信息
// @access  private
router.post('/saveComment', passport.authenticate('jwt', { session: false }), (req, res) => {
  const newComment = new Comment({
    articleID: req.body.articleID,
    // 这里保存用户的id即可，每次获取评论信息时通过该id去查询最新的用户信息
    user_id: req.body.user_id,
    // user_name: req.body.user_name,
    // user_avatar: req.body.user_avatar,
    commentContent: req.body.commentContent
  })
  // 获取评论对应的用户信息
  User.findOne({ _id: newComment.user_id }).then(user => {
    newComment.user_name = user.name
    newComment.user_avatar = user.avatar
    newComment.save().then(comment => {
      res.json(comment)
    }).catch(err => {
      console.log(err)
    })
  }).catch(err => {
    console.log(err)
  })
})

// $router  GET  api/comments/getComment
// @desc    获取指定文章的评论信息(评论内容与评论用户信息)
// @access  public
router.get('/getComment', (req, res) => {
  const articleID = req.query.articleID
  // let UserComment = []
  Comment.find({ articleID: articleID }).sort({ $natural: -1 }).then(comments => {
    comments.forEach((item, index) => {
      // console.log(item.user_id)
      // 更新每条评论对应的用户信息
      User.findOne({ _id: item.user_id }).then(user => {
        comments[index].user_name = user.name
        comments[index].user_avatar = user.avatar
        comments[index].save()
      }).catch(err => {
        console.log(err)
      })
    })
    res.json(comments)
  }).catch(err => {
    console.log(err)
  })
})

/**
 * 文章评论api
 * @type {Router}
 */
module.exports = router
