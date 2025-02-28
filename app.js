const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const playerModel = require("./models/player");
const player = require("./models/player");
const matchsandtornmentsModel = require('./models/matchsandtornments');
const { match } = require("assert");










app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());


//forpersonal
app.get('/creatematch', function (req,res) {
    res.render('matchcreatepage')
})

app.post('/creatematchsmyself', async function(req,res){

    let { matchtype, matchentryamount, matchfirstprice, playerlimit, matchstarttime} = req.body;

    let creatematch = await matchsandtornmentsModel.create({
        matchtype,
        matchentryamount,
        matchfirstprice,
        playerlimit,
        matchstarttime
    })
   console.log(creatematch);
    res.redirect('/creatematch');
})

app.get("/", function (req, res) {
  let token = req.cookies.token;
  res.render("logopage", { token });
});




app.get('/home', isLoggedIn , function(req,res){
    res.render('home');
})

// SIGNUP PAGE PACKEND

app.get("/signup", function (req, res) {
  res.render("signup", { mobileError: null, FormData: {} });
});

app.post("/signup", async function (req, res) {
  let { MobileNo, FFID, FFNAME, password } = req.body;

  let player = await playerModel.findOne({ FFID });
  
  if (MobileNo.length < 10) {
    return res.render("signup", {
      mobileError: "Invalid Mobile Number",
      FormData: req.body,
    });
  }
  if (FFID.length < 10) {
    return res.render("signup", {
      mobileError: "Invalid FF Id",
      FormData: req.body,
    });
  }
  if (player) {
    return res.render("signup", {
      mobileError: "Your FF Id  is already registered",
      FormData: req.body,
    });
  }

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      let player = await playerModel.create({
        MobileNo,
        FFID,
        FFNAME,
        password: hash,
      });
      let token = jwt.sign({ FFID: FFID, playerid: player._id }, "freefirebet");
      res.cookie("token", token);
      res.redirect("/home");
    });
  });
});

app.get('/login', function(req,res){
    res.render('login', {mobileError: null, FormData: {}});
})

app.post('/login', async function(req,res){
    let {FFID, password} = req.body;

    let player = await playerModel.findOne({FFID});
    if(! player){
        return res.render('login',{
            mobileError: "FF Id was Wrong",
            FormData: req.body,
        })
    }
    bcrypt.compare(password, player.password, function (err, result) {
        if (result) {
          let token = jwt.sign({ FFID: FFID, userid: player._id }, "freefirebet");
          res.cookie("token", token);
          res.redirect("home");
        } else {
          return res.render("login", {
            mobileError: "Password is wrong",
            FormData: req.body,
          });
        }
      });
});



function isLoggedIn(req, res, next){

    if(req.cookies.token === ""){
        res.redirect('/signup');
    }else{
        const data = jwt.verify(req.cookies.token, "freefirebet");
        req.player = data;
    }
    next();
}

app.listen(process.env.PORT || 3000, function(){
    console.log('server running well ✔');
});

