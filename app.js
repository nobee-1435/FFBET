const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

// Redirect to Google Pay
app.get("/pay", (req, res) => {
    const upiUrl = encodeURI(
        "upi://pay?pa=malinijayasri2@oksbi&pn=Malini Jayasri&mc=&tid=123456&tr=txn123456&tn=PaymentForService&am=1&cu=INR"
    );
    res.redirect(upiUrl);
});

app.listen(3001, () => {
    console.log("Server is running on http://localhost:3000");
});
