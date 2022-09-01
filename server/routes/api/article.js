const express = require('express')
const router = express.Router()
const passport = require('passport')

// 数据对象
const Article = require('./../../models/articles')

// $router  POST  api/articles/article
// @desc    返回新添加的文章数据
// @access  private
router.post('/article', passport.authenticate('jwt', { session: false }), (req, res) => {
  // 创建新的文章，这里如果想要扩展每个用户都可以发布文章的话，可以将req.user的信息保存在文章列表中
  const newArticle = new Article({
    articleID: Date.now(),
    title: req.body.title,
    abstract: req.body.abstract,
    content: req.body.content,
    cover: req.body.cover
  })
  newArticle.save().then(article => {
    res.json(article)
  }).catch(err => {
    console.log(err)
  })
})
// $router  POST  api/articles/getArticle
// @desc    返回最新的六条文章数据
// @access  public
router.get('/getArticle', (req, res) => {
  // 获取最后六条数据
  Article.find().sort({ $natural: -1 }).limit(6).then(articles => {
    res.json(articles)
  }).catch(err => {
    console.log(err)
  })
})

// $router  POST  api/articles/getOne
// @desc    返回对应的文章信息
// @access  public
router.get('/getOne', (req, res) => {
  const articleID = req.query.articleID
  // 获取指定文章信息数据
  Article.findOne({ articleID: articleID }).then(article => {
    res.json(article)
  }).catch(err => {
    console.log(err)
  })
})
module.exports = router
