const { verify_user_email } = require("../authentication");
const express = require("express")
const router = express.Router()
const auth = require("../controller/auth.controller");
var passport = require('passport')

router.post("/signin",  passport.authenticate('local'),
function(req, res) {
  res.status(200).send({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    roles: req.user.roles,
  });
});

// router.post("/signin", auth.signin)
router.post("/signup", 
  [
      verify_user_email.checkDuplicateUsernameOrEmail,
      verify_user_email.checkRolesExisted
  ],
  auth.signup
)

module.exports = router