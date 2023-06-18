const express=require("express")
const fs = require("fs")
const router=express.Router()
app = express();
const session = require("express-session")//

const dir="e:\\study\\CLG\\Y3 S6\\DP";

// const { Sender } = require("node-mailjet");
// const sendEmail = require("../methods/sendEmail");
app.use(session({
    secret: 'keyboard cat',//encoding
    resave: false,//for every request to    server even if req is from same user or browser it resetssession cookie 
    saveUninitialized: false,//if something not added then no sessions would b created
    //cookie sec//the session cookie will be considered third party and blocked by your browser
}))

router.get("/",(req, res) =>{
    // if (req.session.login) {
    //     res.redirect("/")
    // }
    // else {
    //     res.render("login.ejs", { phrase: "" })
    // }
    // res.render("compiler")
    res.sendFile(dir+"/public/html/compiler.html");
});

module.exports=router;