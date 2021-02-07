const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  let secret = req.headers["x-access-signature"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  
  // Prints: true
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

verify_passort = (req, res, next) => {
  if(!req.cookies[`connect.sid`]){
    res.status(403).send({ message: "Unauthorized!" });
    return;
  }
  next();
}

const authJwt = {
  verify_passort,
  verifyToken,
  isAdmin,
};
module.exports = authJwt;