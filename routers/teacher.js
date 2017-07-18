const express = require('express');
var router = express.Router();
const database = require('../models/');

//untuk validasi session , agar tidak bisa langsung nembak dengan link langsung
router.use((req,res, next)=>{
  if(req.session.user.role == 'academic' || req.session.user.role == 'headmaster' || req.session.user.role == 'teacher'){
    next();
  }else{
    res.send('You have to login as Headmaster or Academic Coordinator');
  }
})

//show teacher table
router.get('/', function(req, res){
  database.Teacher.findAll({
    include: [database.Subject],
    order:[["id"]]
  })
  .then((results) =>{
    res.render('teacher', {dataTeacher:results})
  });
});
//show form teacher and the DROP DOWN
router.get('/add', function(req, res){
  database.Subject.findAll()
  .then((data)=> {
    res.render('tform', {subjectData: data})
  })
});
//add teacher data
router.post('/add', function(req, res){
  console.log("---->", req.body.SubjectId);
  database.Teacher.create({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email:req.body.email,
    SubjectId: req.body.SubjectId,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  .then((result) =>{
      res.redirect('/teacher')
  })
})
//edit form
router.get('/edit/:id', function(req, res){
  database.Teacher.findById(req.params.id)
  .then((result) =>{
    database.Subject.findAll()
    .then((rows)=>{
      // console.log("--------->", result);
      // console.log("=========>", rows);
      res.render('editteacher', {id: result, dataSubject: rows})
    })
  })
})
//edit and update
router.post('/edit/:id', function(req, res){
  database.Teacher.update({
    first_name: `${req.body.firstname}`,
    last_name:`${req.body.lastname}`,
    email:`${req.body.email}`,
    SubjectId: `${req.body.ContactID}`,
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
