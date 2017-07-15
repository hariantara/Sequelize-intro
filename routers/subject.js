const express = require('express');
var router = express.Router();
const database = require('../models/');

//data subject
router.get('/', function(req, res){
  database.Subject.findAll(
    {
      include: [database.Teacher]
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


module.exports = router;
