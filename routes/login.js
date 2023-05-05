
const express = require('express');
const router = express.Router();
const fs = require('fs');
const session = require('express-session');
const __dir = "e:\\study\\CLG\\Y3 S6\\DP";

router.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

router.get('/',(req,res)=>{
    if(req.session.login) res.redirect('/home');
    else res.render('login',{loggedOut: 0, msg:"",phrase:""});
})

router.post('/',(req,res)=>{
    let name = req.body.name
    let psw = req.body.password
    console.log(req.body);
    let flag = false;
    let currUser = req.body;
    
    fs.readFile(__dir+"/data.json",'utf-8',(error,data)=>{
        let theFile;
        // console.log(data)
        console.log()
        if(data.length === 0) theFile =[];
        else theFile = JSON.parse(data);

        for(let i = 0 ; i < theFile.length;i++){
            if(theFile[i].name === currUser.name && theFile[i].password === currUser.password){
                if(theFile[i].verified){
                    flag = true;
                    // req.session.login = true;
                    // req.session.email = theFile[i].email;
                    // req.session.username = currUser.username;
                    req.session.name = name;
                    req.session.mail = theFile[i].email;
                    req.session.login = true;
                    res.redirect("/");
                }
                else{
                    res.render('login', { loggedOut:-1, phrase:"Please verify your email!"});
                    return;
                }   
            }
        }
        if(!flag) res.render('login', { loggedOut:-1, phrase:"Invalid Credentials!"});
    })
})

module.exports = router;