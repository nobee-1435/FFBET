const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
dotenv.config();
const UserModel = require('./models/user');

const app = express();
app.set("view engine", 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/',async function(req,res){
    res.render('index');  
})

app.post('/setup', async function(req,res){
    let {name,mobile} = req.body;
    let user = await UserModel.create({
        name,
        mobile
    })
    res.send('success...')
    console.log(user);
})




app.listen(process.env.PORT, function(){
    console.log(`Server Running Well on ${process.env.PORT}`);
    
})