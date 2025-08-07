const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const path = require('path');
const connectDb = require('./db/connectDb');
const session = require('express-session');
const nocache = require('nocache');
const hbs = require('hbs');
hbs.registerHelper('inc', function(value) {
  return parseInt(value) + 1;
});


app.use(nocache());
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { 
      maxAge: 1000*60*60*24 
    }
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);


connectDb();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});