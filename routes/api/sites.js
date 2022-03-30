const express = require("express");
const router = express.Router();
const Site = require("../../models/Site");
const jwt = require("jsonwebtoken");
const User = require('../../models/User');
const key = require('../../config/keys').secret;
//all sites

router.get("/sites", (req, res) => {
  Site.find({}).then((sites) => {
    if (!sites) {
      return res.status(404).json({
        msg: "sites not found !",
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      sites,
      msg: "all sites !",
    });
  });
});

router.post("/addSite",  (req, res, next) => {
  let token = req.headers.token; //token
  user=new User
  jwt.verify(token, key, (err, decoded) => {
  
    User.findOne({ _id: decoded._id }, (err, user) => {
      if (err) return console.log(err)
      user
      })
    
    })

  
  const { title, url, email, logo, phone, fax,etat } = req.body;
  const newSite = new Site({
    title,
    url,
    email,
    logo,
    phone,
    fax,
    etat,
    owner: user,
  });
  // r=req.headers.token;
  // return res.json({user})
  try {
    const saved =  newSite.save();
    res.send({
      success: true,
      site: saved,
    });
  } catch (e) {
    next(e);
  }
});
// router.get("/getSite" , (req, res, next) => {
//   let token = req.headers.token; //token
//   site = new Site
//   jwt.verify(token, key, (err, decoded) => {
//     user=new User
//     site = new Site
//     const query = {
//       owner: decoded._id
//     };
//   console.log(decoded)
//     site = Site.find(query)
//       if (err) return console.log(err)
//       console.log(site)
//       JSON.stringify(site)
//       return res.json (
//         site
//       )      
//       })
     
//       //  site =  Site.find(query)
//       // //  console.log(site)
//       // return res.send({
//       //   user
//       // })
      
    

// });

module.exports = router; 