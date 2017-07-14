const express = require('express');
var router = express.Router();
const database = require('../models/');

//show teacher table
router.get('/', function(req, res){
  database.Students.findAll()
  .then((results) =>{
    res.render('students', {dataStudent:results})
  });
});
//show form addColumn
router.get('/add', function(req, res){
    res.render('stform')
});
//add student data
router.post('/add', function(req, res){
  database.Students.create({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  .then(() =>{
      res.redirect('/student')
  })
})
//edit form
router.get('/edit/:id', function(req, res){
  database.Students.findById(req.params.id)
  .then((result) =>{
    console.log(result);
    res.render('editstudent', {studentsData: result})
  })
})
//edit and update
router.post('/edit/:id', function(req, res){
  database.Students.update({
    first_name: `${req.body.firstname}`,
    last_name: `${req.body.lastname}`,
    email: `${req.body.email}`,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    where: {
      id: `${req.params.id}`
    }
  })
  .then(()=>{
    res.redirect('/student')
  })
})
//delete
router.get('/delete/:id', function(req, res){
  database.Students.destroy({where:{id:`${req.params.id}`}})
  .then(() =>{
    res.redirect('/student')
  })
})


module.exports = router
