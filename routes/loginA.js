const express=require("express")
const fs = require("fs")
const router=express.Router()
// const dir="h:\\ECOMMERCE";
const dir="e:\\study\\CLG\\Y3 S6\\DP";
app = express();
const session = require("express-session")//

// const { Sender } = require("node-mailjet");
// const sendEmail = require("../methods/sendEmail");
app.use(session({
    secret: 'keyboard cat',//encoding
    resave: false,//for every request to    server even if req is from same user or browser it resetssession cookie 
    saveUninitialized: false,//if something not added then no sessions would b created
    //cookie sec//the session cookie will be considered third party and blocked by your browser
}))

router.get("/",(req, res) =>{
    if (req.session.login) {
        res.redirect("/")
    }
    else {
        res.render("login.ejs", { phrase: "" })
    }
});
router.post("/",(req, res)=> {
        let name = req.body.name
        let psw = req.body.password

        let h = false;
        let info = [];
        if (name == "" || name.trim().length == 0) {
            res.render("login.ejs", { phrase: "Name field must not be empty!" })
            return
        }
        else if (psw == "" || psw.trim().length == 0) {
            res.render("login.ejs", { phrase: "Password field must not be empty!" })
            return;
        }
        else {
            fs.readFile(dir + "/data.json", "utf-8", function (err, data) {

                if (data.length == 0) {
                    info = []
                    res.render("login.ejs", { phrase: "Invalid name!,Why Don't you Sign up?" });
                    return;
                } else {
                    info = JSON.parse(data);
                    for (let i = 0; i < info.length; i++) {
                        if(info[i].name == name&&info[i].verified==false){
                            h=true;
                            // sendEmail(info[i].email, info[i].token, 2, (err,data)=>{
                            //     res.render("login.ejs", { phrase: "Verify your self and login again" })
                            //     return;
                            // })
                            
                        }
                        else if (info[i].name == name&&info[i].verified==true) {
                            h = true;
                            if (info[i].password == psw) {
                                req.session.name = name;
                                req.session.mail=info[i].email;
                                req.session.login = true;
                                res.redirect("/")
                                // res.send("login success")
                            }
                            else {
                                res.render("login.ejs", { phrase: "Your PassWord Doesn't match!" });
                            }
                        }
                    }
                    if (h == false) {
                        res.render("login.ejs", { phrase: "Invalid name!,Why Don't you Sign up?" });
                    }
                }
            })
        }
})

module.exports=router;