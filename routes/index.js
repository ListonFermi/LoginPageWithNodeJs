var express = require('express');
var router = express.Router();
var session = require('express-session');
var credentials={email:"listonfermi@gmail.com", password:"12345678"}
var myProjects=[
  {name:'Image 1', image: 'https://picsum.photos/200/300'},
  {name:'Image 2', image: 'https://picsum.photos/201/300'},
  {name:'Image 3', image: 'https://picsum.photos/200/301'},
  {name:'Image 4', image: 'https://picsum.photos/200/302'}
]

/* GET home page. */
router.get('/',function(req, res, next) {
  if(req.session.loggedIn){
    res.redirect('/homepage')
  }else{
    res.render('index');
  }
});

router.post('/login', function(req,res){
  if(credentials.email===req.body.email_input&&credentials.password===req.body.password_input){
    req.session.loggedIn= true
    req.session.name= credentials.email
    req.session.password= credentials.password
    res.render('homepage',{myProjects})
  }else{
    res.render('index',{invalidCredentials : true})
  }
})

router.get('/index', function(req, res, next) {
  req.session.destroy()
  res.render('index',{loggedout: true});
})

module.exports = router;