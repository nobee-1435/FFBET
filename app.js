const exp = require('constants');
const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

//moduels
const PlayerModel = require("./models/player")

app.get('/',async function(req,res){
    res.render('signup');
})

app.post('/signup', async function(req,res){
    let{MobileNo, FFID, FFNAME} = req.body;
    let player = await PlayerModel.create({
        MobileNo,
        FFID,
        FFNAME
    })
    res.send('success');
    console.log(player);
})

app.listen(process.env.PORT, function(){
    console.log('server running well 🤞');
})