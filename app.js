const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const session = require('express-session');

const playerModel = require("./models/player");
const player = require("./models/player");
const mainMatchContainerModel = require("./models/mainMatchContainer");
const matchFullDetailsModel = require("./models/matchFullDetails");
const appliedPlayerListModel = require("./models/appliedPlayerList");
const selectedPlayerListModel = require("./models/selectedPlayerList");
const { log } = require("console");
const matchFullDetails = require("./models/matchFullDetails");

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use(session({
  secret: 'freefirebet',
  resave: false,
  saveUninitialized: true
}));


//forpersonal
app.get("/ffbetcreatematchmyself",async function (req, res) {


  res.render("matchcreatepage");
});



app.post('/creatematchsmyself',async function(req,res){
  const mainMatchContainer = await mainMatchContainerModel.findOne();  

  let {matchType,entryAmount,firstPrice,secondPrice,thirdPrice,fourthandfifthPrice,sixthtoteenthPrice,totalParticipantPlayerNumber,matchStartingTime} = req.body;

  let matchFullDetails = await matchFullDetailsModel.create({
    matchType,
    entryAmount,
    firstPrice,
    secondPrice,
    thirdPrice,
    fourthandfifthPrice,
    sixthtoteenthPrice,
    totalParticipantPlayerNumber,
    matchStartingTime
  });
  await matchFullDetails.save();
  mainMatchContainer.matchFullDetails.push(matchFullDetails._id);
  await mainMatchContainer.save();
  res.redirect('/ffbetcreatematchmyself')
})





app.get("/", function (req, res) {
  let token = req.cookies.token;
  res.render("logopage", { token });
});

app.get("/home", isLoggedIn,async function (req, res) {
  let mainMatchContainer = await mainMatchContainerModel.find().populate('matchFullDetails');
  const matchAppliedorcanceled = req.session.matchAppliedorcanceled;
  req.session.matchAppliedorcanceled = null;

 
  
  
  
  res.render("home", {mainMatchContainer, matchAppliedorcanceled: matchAppliedorcanceled});
});

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
      res.cookie("token", token, {
        httpOnly: true,
        secure: "freefirebet",
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        sameSite: "strict",
      });
      res.redirect("/home", {
        homeNotification: "your Your ID was Added Successfully",
        FormData: req.body,
      });
    });
  });
});

app.get("/login", function (req, res) {
  res.render("login", { mobileError: null, FormData: {} });
});

app.post("/login", async function (req, res) {
  let { FFID, password } = req.body;

  let player = await playerModel.findOne({ FFID });
  if (!player) {
    return res.render("login", {
      mobileError: "FF Id was Wrong",
      FormData: req.body,
    });
  }
  bcrypt.compare(password, player.password, function (err, result) {
    if (result) {
      let token = jwt.sign({ FFID: FFID, playerId: player._id }, "freefirebet");
      res.cookie("token", token, {
        httpOnly: true,
        secure: "freefirebet",
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        sameSite: "strict",
      });
      res.redirect("home");
    } else {
      return res.render("login", {
        mobileError: "Password is wrong",
        FormData: req.body,
      });
    }
  });
});

app.get(
  "/payment/:matchType/:entryAmount/:playerId/:matchStartingTime/:MDmatchId/:hashedRoute",
  isLoggedIn,
  async function (req, res) {
  
  
    
    
    let {matchType, entryAmount, playerId, matchStartingTime, MDmatchId} = req.params;
    const player = await playerModel.findOne({ FFID: req.player.FFID });
    
    res.render("payment", {matchType,entryAmount,matchStartingTime,playerId,player,MDmatchId});
  }
);

app.post("/payment", isLoggedIn, async function (req, res) {
  const player = await playerModel.findOne({ FFID: req.player.FFID });

  const playerId = player.FFID;
  let { MDmatchId, entryAmount, matchType, matchStartingTime} = req.body;

  

  const hashedRoute = crypto
    .createHash("sha256")
    .update(entryAmount)
    .digest("hex");

  res.redirect(
    `payment/${matchType}/${entryAmount}/${playerId}/${matchStartingTime}/${MDmatchId}/${hashedRoute}`
  );
});

app.post('/paymentsend',isLoggedIn, async function(req,res){
  let{MDmatchId,playerName,playerId,matchType,entryAmount,paymentMethod,matchStartingTime,TransactionId} = req.body;


  const matchFullDetails = await matchFullDetailsModel.findOne({_id: MDmatchId}).populate('appliedPlayerList');
  const fullTransactionId = await appliedPlayerListModel.findOne({TransactionId});
  const fullPlayerId = await appliedPlayerListModel.findOne({playerId});
  if(fullTransactionId){
    req.session.matchAppliedorcanceled = `${TransactionId} This TransactionId Was Already Used. Please Enter Valid TransactionId`;
    return res.redirect('home');
  }

if (matchFullDetails) {
  const playerIds = matchFullDetails.appliedPlayerList.map(player => player.playerId);
  if(playerIds.includes(playerId)){
    req.session.matchAppliedorcanceled = `${playerId} This PlayerId Was Already Applied This Match`;
    return res.redirect('home');
  }

  else{
    let appliedPlayerList = await appliedPlayerListModel.create({
      MDmatchId,
      playerName,
      playerId,
      matchType,
      matchStartingTime,
      entryAmount,
      paymentMethod,
      TransactionId,
    })
    await appliedPlayerList.save();
    matchFullDetails.appliedPlayerList.push(appliedPlayerList._id);
    await matchFullDetails.save();
    req.session.matchAppliedorcanceled = 'Applied Sucessfully.. Wait for few Minutes.. you will be add that match';
    return res.redirect('home');
  }
}

})

async function xxx(req,res) {
  let match = await matchFullDetailsModel
  .findById('67ce9b2aff9fdada9cb9bbdd')
  .populate('appliedPlayerList');

if (match) {
  // Extract only the playerId values
  const playerIds = match.appliedPlayerList.map(player => player.playerId);
  console.log('All player IDs:', playerIds);
} else {
  console.log('Match not found');
}
  
  
}
// xxx()


function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") {
    res.redirect("/signup");
  } else {
    const data = jwt.verify(req.cookies.token, "freefirebet");
    req.player = data;
  }
  next();
}

app.listen(process.env.PORT || 3000, function () {
  console.log("server running well ✔");
});
