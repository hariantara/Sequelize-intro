const express = require('express');
var router = express.Router();
const database = require('../models/');

//show teacher table
router.get('/', function(req, res){
  database.Teacher.findAll()
  .then((results) =>{
    res.render('teacher', {dataTeacher:results})
  });
});
//show forom teacher
router.get('/add', function(req, res){
    res.render('tform')
});
//add teacher data
router.post('/add', function(req, res){
  database.Teacher.create({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email:req.body.email,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  .then(() =>{
      res.redirect('/teacher')
  })
})
//edit form
router.get('/edit/:id', function(req, res){
  database.Teacher.findById(req.params.id)
  .then((result) =>{
    res.render('editteacher', {id: result})
  })
})
//edit and update
router.post('/edit/:id', function(req, res){
  database.Teacher.update({
    first_name: `${req.body.firstname}`,
    last_name:`${req.body.lastname}`,
    email:`${req.body.email}`,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    where: {
      id: `${req.params.id}`
    }
  })
  .then(()=>{
    res.redirect('/teacher')
  })
})
//delete
router.get('/delete/:id', function(req, res){
  database.Teacher.destroy({where:{id:`${req.params.id}`}})
  .then(() =>{
    res.redirect('/teacher')
  })
})


module.exports = router;
