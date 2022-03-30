const express = require("express");
const router = express.Router();
const Site = require("../../models/Site");
const jwt = require("jsonwebtoken");
const Question = require("../../models/Question");
const key = require("../../config/keys").secret;
//all sites

router.get("/questions", (req, res) => {
  Question.find({}).then((questions) => {
    if (!questions) {
      return res.status(404).json({
        msg: "questions not found !",
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      questions,
      msg: "all questions !",
    });
  });
});

router.post("/addquestion", (req, res, next) => {
  let token = req.headers.token; //token
  user = new User();
  jwt.verify(token, key, (err, decoded) => {
    User.findOne({ _id: decoded._id }, (err, user) => {
      if (err) return console.log(err);
      user;
    });
  });

  const { description,notes, status, domaine,site } = req.body;
  const newQuestion = new Question({
    description,notes, status, domaine,site
  });
  // r=req.headers.token;
  // return res.json({user})
  try {
    const saved = newQuestion.save();
    res.send({
      success: true,
      newQuestion: saved,
      newQuestion
    });
  } catch (e) {
    next(e);
  }
});
module.exports = router;
