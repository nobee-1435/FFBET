const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});
app.post('/playerDetails', function(req,res){
    res.redirect("freefire://createroom");
})


app.listen(3001, () => {
    console.log("Server is running on http://localhost:3000");
});
