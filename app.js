const express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

app.set('view engine', 'ejs');

app.use(bodyParser.json()); // digunakan saat menjalankan fungsi POST
app.use(bodyParser.urlencoded({
  extended: true
})); // hasil post di encoded


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))

const subjects = require('./routers/subject')
const teachers = require('./routers/teacher')
const students = require('./routers/students')
const logins = require('./routers/loginRouter')
// const dashboards = require('./routers/login')

app.use('/subject', subjects);
app.use('/teacher', teachers);
app.use('/student', students);
app.use('/', logins);

// app.listen(3000);
app.listen(process.env.PORT || 3000);
