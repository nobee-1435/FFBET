const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

// Redirect to Google Pay using UPI Intent (Mobile Number)
app.get("/pay", (req, res) => {
    const mobileNumber = "7603959664"; // Replace with the recipient's UPI-linked mobile number
    const amount = "49"; // Amount in INR
    const transactionNote = "Payment for Service";

    // Google Pay UPI Intent URL
    const upiUrl = encodeURI(
        `upi://pay?pa=${mobileNumber}@ybl&pn=RecipientName&mc=&tid=123456&tr=txn123456&tn=${transactionNote}&am=${amount}&cu=INR`
    );

    res.redirect(upiUrl);
});

app.listen(3001, () => {
    console.log("Server is running on http://localhost:3000");
});
