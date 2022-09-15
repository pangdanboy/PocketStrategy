const express = require('express')
const router = express.Router()
const passport = require('passport')

// 数据对象
const Article = require('./../../models/articles')
const User = require('./../../models/users')

// $router  POST  api/articles/article
// @desc    返回新添加的文章数据
// @access  private
router.post('/article', passport.authenticate('jwt', { session: false }), (req, res) => {
  // 创建新的文章，这里如果想要扩展每个用户都可以发布文章的话，可以将req.user的信息保存在文章列表中
  const newArticle = new Article({
    articleID: Date.now(),
    user_id: req.user.id,
    // author: req.user.name,
    title: req.body.title,
    abstract: req.body.abstract,
    content: req.body.content,
    cover: req.body.cover
  })
  // 获取文章对应的用户信息
  User.findOne({ _id: newArticle.user_id }).then(user => {
    newArticle.author = user.name
    newArticle.save().then(article => {
      res.json(article)
    }).catch(err => {
      console.log(err)
    })
  }).catch(err => {
    console.log(err)
  })
})
// $router  GET  api/articles/getArticle
// @desc    返回最新的指定条文章数据
// @access  public
router.get('/getArticle', (req, res) => {
  // 获取当前没有获取过的最后的指定条数数据
  Article.find().sort({ $natural: -1 }).limit(req.query.articleNumber).then(articles => {
    // 更新文章对应用户信息
    articles.forEach((item, index) => {
      // console.log(item.user_id)
      // 更新每篇文章对应的用户信息
      User.findOne({ _id: item.user_id }).then(user => {
        articles[index].author = user.name
        articles[index].save()
      }).catch(err => {
        console.log(err)
      })
    })
    res.json(articles)
  }).catch(err => {
    console.log(err)
  })
})

// $router  GET  api/articles/getCount
// @desc    返回当前文章总数
// @access  public
router.get('/getCount', (req, res) => {
  // 获取当前没有获取过的最后六条数据
  Article.find().count((err, count) => {
    if (!err) {
      res.json({ articleCount: count })
    }
  })
})

// $router  GET  api/articles/getOne
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

// $router  PUT  api/articles/support
// @desc    返回修改点赞数后对应的文章信息
// @access  public
router.put('/support', (req, res) => {
  const articleID = req.body.articleID
  // 获取指定文章信息数据，修改文章点赞数
  Article.findOne({ articleID: articleID }).then(article => {
    article.support += 1
    article.save()
    res.json(article)
  }).catch(err => {
    console.log(err)
  })
})
module.exports = router
