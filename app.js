const exp = require('constants');
const express = require('express');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

//moduels
const PlayerModel = require("./models/player")

app.get('/',async function(req,res){
    res.render('signup', { mobileError: null, FormData: {} });
})

app.post("/signup", async function (req, res) {
    let { MobileNo, FFID, FFNAME, password } = req.body;
  
    let player = await PlayerModel.findOne({ FFID });
    if (MobileNo.length < 10) {
      return res.render("signup", {
        mobileError: "Invalid Mobile Number",
        FormData: req.body,
      });
    };
    if (FFID.length < 10) {
        return res.render("signup", {
          mobileError: "Invalid FFID",
          FormData: req.body,
        });
      }
    if (player) {
      return res.render("signup", {
        mobileError: "FFID is already registered",
        FormData: req.body,
      });
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        let user = await PlayerModel.create({
          MobileNo,
          FFID,
          FFNAME,
          password: hash,
        });
        let token = jwt.sign({ MobileNo: MobileNo, userid: user._id }, "ffbet");
        res.cookie("token", token, {
          httpOnly: true,
          secure: "ffbet",
          // maxAge: 180 * 24 * 60 * 60 * 1000,
          sameSite: "strict",
        });
        res.send("success");
      });
    });
  });

app.listen(process.env.PORT || 3000, function(){
    console.log('server running well 🤞');
})