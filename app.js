const express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.json()); // digunakan saat menjalankan fungsi POST
app.use(bodyParser.urlencoded({
  extended: true
})); // hasil post di encoded


const subjects = require('./routers/subject')
const teachers = require('./routers/teacher')
const students = require('./routers/students')

app.use('/subject', subjects);
app.use('/teacher', teachers);
app.use('/student', students);


app.listen(3000);
