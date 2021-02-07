const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcryptjs");
require('dotenv').config()

const app = express();

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))


var corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:8080']
}
// use cors options
app.use(cors(corsOptions))

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// database
const db = require("./app/models");
const User = db.user;
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }).populate("roles", "-__v")
    .exec((err, user) => {

      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      var passwordIsValid = bcrypt.compareSync(
        password,
        user.password
      );

      if (!passwordIsValid) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      
      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      

      // user details
      const user_information = {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
      }

      return done(null, user_information);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to the database!");
    initialize();
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


  const Role = db.role
  function initialize() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }
 
// routes
const blog = require('./app/routes/blog') // blog routes
const auth = require('./app/routes/auth') // user authentication

app.use('/api/blog',blog, function(req, res, next){
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Credentials: true",
    "Origin, Content-Type, Accept"
  );
  next();
}) // user authorization
app.use('/api/auth', auth, function(req, res, next){
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Credentials: true",
    "Origin, Content-Type, Accept"
  );
  next();
}) // auth authentication
  
// listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});