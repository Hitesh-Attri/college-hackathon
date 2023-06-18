const express=require("express")
const router=express.Router()
const fs = require("fs");
// const { Sender } = require("node-mailjet");
const sendEmail = require("../methods/sendEmail");
// const dir="h:\\ECOMMERCE";
const dir="e:\\study\\CLG\\Y3 S6\\DP";
router.route("/").get(function (req, res) {
    res.render("signup.ejs", { phrase: "" })
})
    .post(function (req, res) {
        let name = (req.body.name);
        let mail = (req.body.email)
        let psw = (req.body.password)

        // call here 

    

        console.log(name, mail, psw,2321);
        if (name == "" || name.trim().length == 0) {
            res.render("signup.ejs", { phrase: "Name field must not be empty!" })

        }


        else if (psw == "" || psw.trim().length == 0) {
            res.render("signup.ejs", { phrase: "Password field must not be empty!" })

        }
        else if (mail == "" || mail.trim().length == 0) {
            res.render("signup.ejs", { phrase: "Email field must not be empty!" })

        }
        else {
            fs.readFile(dir + "/data.json", "utf-8", function (err, data) {
                let info = [];
                let check = false;
                if (data.length != 0) {
                    info = JSON.parse(data);
                    for (let i = 0; i < info.length; i++) {
                        if (info[i].email == mail) {
                            check = true;
                            res.render("signup.ejs", { phrase: 'This Email Id is already registered' })
                            return;
                        }
                    }
                }
                if (!check&&data.length!=0) {
                    req.session.name = name;
                    req.session.mail=mail
                    // console.log(req.body, 171)
                    let user = {
                        name:name.trim(),
                        email:mail.trim(),
                        password:psw.trim(),
                        verified:false,
                        token:Date.now()
                    }
                    
                    info.push(user)
                    fs.writeFile(dir + "/data.json", JSON.stringify(info), function (err) {
                        // sendEmail(user.email, user.token, 2, (err,data)=>{
                        //     res.render("signup.ejs", { phrase: 'Get your self verified, check mail and login' })
                        //     return;
                        // })
                        sendEmail(req, user.token, (info)=>{
                            console.log("this is sendEmail callback")
                            // console.log(info)
                            // res.render('root', { loggedOut:-1, msg:"Please verify your email! then login"});
                            res.render("signup.ejs", { phrase: 'Get your self verified, check mail and login' })
                        })
                    })
                    
                    // if(user.verified==false){
                        
                    // }
                    // else{
                    //    if() req.session.login = true;                        
                        // res.redirect("/")
                        
                    // }
                }

            })
        }

        // res.end();
        // res.send("some error occured")
    })

module.exports=router;