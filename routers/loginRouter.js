const express = require('express');
var router = express.Router();
const database = require('../models/');
var session = require('express-session');

router.get('/', function(req, res){
  res.render('login')
})

//kalau data
// router.get('/login', function(req, res){
//   if(req.session.user)
//   {
//     res.redirect('/teachers')
//   }
//   else{
//     res.render('loginRouter')
//   }
// })

router.post('/login', function(req, res){
  if(!req.body.username || !req.body.password)
  {
    res.send('Masukan pls')
  }
  else{
    database.Users.findOne({
      where:{ username: req.body.username}
    })
    .then(data =>{
      if(data.password == req.body.password)
      {
        req.session.user = {
          username: req.body.username,
          role: data.role
        }
        if(data.role == 'teacher')
        {
          res.redirect('/student')
        }
        else if (data.role == 'academic')
        {
          res.redirect('/subject')
        }
        else {
          res.redirect('/teacher')
        }
      }
      else {
        res.send('wrong password')
      }
    })
    .catch(err => {
      res.send('user not found')
    })
  }
})

router.get('/logout', function(req, res){
  req.session.destroy(() =>{
    res.redirect('/')
  })
})

module.exports = router;
