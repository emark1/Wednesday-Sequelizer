const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const models = require('./models')

app.engine('mustache',mustacheExpress())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views','./views')
app.set('view engine','mustache')


app.post('/create-post',(req,res) => {
    //Get the input variables from the create-post page
    let title = req.body.title
    let body = req.body.body

    let post = models.Post.build({
        title: title,
        body: body
      })
    
    post.save().then((savedPost) => {
      console.log(savedPost)
    })
    .then(() => {
    res.redirect('view-posts')
      console.log("Ay pretty good")
    }).catch(error => console.log(error))
})

//Render view-posts and insert the data from the database
app.get('/view-posts',(req,res) => {
    models.Post.findAll().then((posts) => {
        res.render('view-posts',{posts: posts})
        console.log(posts)
      })
})

app.post('/delete-post',(req,res) => {

    //Create variable of postid, after converting it to an int. Must be int because in the database, postid is an integer, not a string
    let postId = parseInt(req.body.postId)
    models.Post.destroy({
        where: {
          id : postId
        }
      }).then((deletedPost) => {
        res.redirect('/view-posts')
        console.log(deletedPost)
    })
})

//Render the edit-post page with only the selected post displayed
app.get('/posts/edit/:postId',(req,res) => {

    let postId = req.params.postId
    models.Post.findOne({
        where: {
          id : postId
        }
      }).then((post) => {
      console.log(post)
      res.render('edit-post',{post: post})
    })
})

//Edit post
app.post('/edit-post',(req,res) => {
    let postID = parseInt(req.body.postId)
    let title = req.body.title
    let body = req.body.body
    models.Post.update({
        title : title
      },{
        where: {
          id : postID
        }
      }).then(() => {
        res.redirect('/view-posts')
      })
  })

//Render page to create post
app.get('/create-post',(req,res) => {
    res.render('create-post')
  })

app.get('/view-posts',(req,res) => {
    res.render('view-posts')
})
  
app.listen(3000,function(){
    console.log("Server sure is humming!")
  })