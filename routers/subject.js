const express = require('express');
var router = express.Router();
const database = require('../models/');

//validasi session, agar tidak bisa masuk langsung ke link
router.use((req,res, next)=>{
  if(req.session.user.role == 'academic' || req.session.user.role == 'headmaster' || req.session.user.role == 'teacher'){
    next();
  }else{
    res.send('You have to login as Headmaster or Academic Coordinator');
  }
})

//data subject
router.get('/', function(req, res){
  database.Subject.findAll(
    {
      include: [database.Teacher],
      order:[["id"]]
    }
  )
  .then(results =>{
    // console.log(JSON.stringify(result));
    res.render('subjects', {dataSubjects:results})
  });
});
//show form addColumn
router.get('/add', function(req, res){
  database.Subject.findAll({
    include: [database.Teacher]
  })
  .then((dataTeacher) =>{
    //console.log("=====>",dataTeacher);
    res.render('sform', {dataT:dataTeacher})
  })
});
//add subject data
router.post('/add', function(req, res){
  database.Subject.create({
    subject_name: req.body.subjectname,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  .then(() =>{
      res.redirect('/subject')
  })
})
//edit form
router.get('/edit/:id', function(req, res){
  database.Subject.findById(req.params.id)
  .then((result) =>{
    res.render('editsubject', {subdata: result})
  })
})
//edit and update
router.post('/edit/:id', function(req, res){
  database.Subject.update({
    subject_name: `${req.body.subjectname}`,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    where: {
      id: `${req.params.id}`
    }
  })
  .then(()=>{
    res.redirect('/subject')
  })
})
//delete
router.get('/delete/:id', function(req, res){
  database.Subject.destroy({where:{id:`${req.params.id}`}})
  .then(() =>{
    res.redirect('/subject')
  })
})
//go to enroll page
router.get('/enroll/:id', function(req, res){
  database.Subject.findById(req.params.id)
  .then((result) =>{
    database.Students.findById(req.params.id)
    .then((stud)=>{
      res.render('enroll', {subjectDatum:result ,studentName: stud})
    })
  })
})


module.exports = router;
