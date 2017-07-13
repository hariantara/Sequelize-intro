const express = require('express');
var router = express.Router();
const database = require('../models/');

router.get('/', function(req, res){
  database.Subject.findAll()
  .then((results) =>{
    res.render('subjects', {dataSubjects:results})
  });
});


module.exports = router;
