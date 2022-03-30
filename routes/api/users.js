const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/User");
const key = require("../../config/keys").secret;
//Register

router.post("/register", (req, res) => {
  let { name, username, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    return res.status(400).json({
      msg: "Password do not match !",
    });
  }

  // check unique username
  User.findOne({ username: username }).then((user) => {
    if (user) {
      return res.status(400).json({
        msg: "user already taken  !",
      });
    }
  });
  // check unique email
  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({
        msg: "Email  already exist did you forgot your password  !",
      });
    }
  });
  // register User

  let newUser = new User({
    name,
    username,
    password,
    email,
  });

  // hash password

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) => {
        return res.status(201).json({
          success: true,
          msg: "User is now registered",
        });
      });
    });
  });
});

// Login

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(404).json({
        msg: "user not found !",
        success: false,
      });
    }
    //compare password
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        // correct password we need to generate json web token
        const payload = {
          _id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
        };
        jwt.sign(
          payload,
          key,
          {
            expiresIn: 604800,
          },
          (err, token) => {
            res.status(200).json({
              success: true,
              token: token,
              msg: "you are now logged in sir !",
            });
          }
        );
      } else {
        return res.status(404).json({
          msg: "incorrect password !",
          success: false,
        });
      }
    });
  });
});
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      user: req.user,
    });
  }
);

router.get("/user", (req, res, next) => {
  let token = req.headers.token; //token
  jwt.verify(token, key, (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "unauthorized",
      });
    //token is valid
    User.findOne({ _id: decoded._id }, (err, user) => {
      if (err) return console.log(err);
      return res.status(200).json({
        title: "user grabbed",
        user,
      });
    });
  });
});
// Update Profile

router.post("/update", (req, res) => {
  const { name, username, email, password } = req.body;
  newUser = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
    });
  });
   let token = req.headers.token; //token
   console.log('-------------')
      console.log(token)
      console.log('-------------')

  jwt.verify(token, key, (err, decoded) => {
    User.findOne({ _id: decoded._id }, (err, user) => {
      User.findOneAndUpdate({ email: user.email }, newUser, {
        useFindAndModify: false,
      }).then((users) => {
        if (!users) {
          return res.status(404).json({
            msg: "users not found !",
            success: false,
          });
        }
        res.status(200).json({
          success: true,
          users,
          msg: "all users !",
        });
      });
    });
  });
});
module.exports = router;
