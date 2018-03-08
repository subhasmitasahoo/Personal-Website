var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine","ejs");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

var nodemailer = require('nodemailer');
var router = express.Router();

var path = require('path');

var port = process.env.PORT || 8080;

app.get("/",function(req,res){
   res.render("index.ejs"); 
});

app.get("/downloadResume",function(req,res){
    console.log("downloading...");
    var file = path.join(__dirname, 'resume.pdf');
   res.download(file, function (err) {
       if (err) {
           console.log("Error");
           console.log(err);
       } else {
           console.log("Success");
       }
   });
});

app.get("/blogs/personalsite", function(req,res){
  res.render("personalSiteBlog.ejs");
});

app.get("/home",function(req,res){
  res.redirect("/");
});

app.post("/message",function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
    console.log(req);
    console.log(name);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'subhablog247@gmail.com', // Your email id
            pass: 'Chachi247' // Your password
        }
    });
    var mailOptions = {
    from: email, // sender address
    to: 'subhasmitasahoo.247@gmail.com', // list of receivers
    subject: 'Someone from Subhasmita Portfolio', // Subject line
    text: message
	};

	transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
	});
    res.redirect("/");
});

app.listen(port,function(){
    console.log("Server has started!");
});