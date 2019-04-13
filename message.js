var express= require("express");

var router=express.Router({mergeParams: true});
var passport=require("passport");
var Medical=require("../models/medical");
var middleware=require("../middleware");
var Message=require("../models/message");
var http = require("http");
var io = require('socket.io');
var app=express();
var server = http.Server(app);
var websocket=io(server);
var request=require("request-promise");

router.use(passport.initialize());
router.use(passport.session());
router.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

router.get('/messages', (req, res) => {
   
      res.render("chat.ejs");
    
  });



  router.post("/predict",async function(req,res)
  {
      var diseases=[];
      
      console.log(req.body.diseases);
      var obj={disease:req.body.diseases};
      data=obj;
      res.redirect("/postDatatoFlask");
      

  });
  router.post("/bmi",function(req,res)
  {
      var gender=req.body.gender;
      var height=req.body.height;
      var weight=req.body.weight;
    var obj={
        gender: gender,
        height: height,
        weight: weight
    }
      var options={
          method: "POST",
          url: "http://127.0.0.2:5000/bmi",
          body: obj,
          json: true
      }
  })
  router.get("/postDatatoFlask",async function(req,res)
  {
      
      // var data={movie:"Fargo"};
      if(data)
      {
          var options={
              method: "POST",
              url: "http://127.0.0.2:5000/predict",
              body: data,
              json: true
          };
      }
      else
      console.log("The input movie was empty");
     

      var returndata;
      var sendrequest=await request(options)
      .then(function(parsedBody)
      {
          console.log(parsedBody);
          for(var i=0;i<parsedBody.length;i++)
           console.log(parsedBody[i]);
          // var obj=JSON.stringify(parsedBody);
          // console.log(obj);
         res.send(parsedBody);
      // res.render("./recommend/result.ejs",{movies:});
         
      }).then(function()
      {
          console.log("movie recommendations was succesfull");
         
      })
      .catch(function(err)
      {
          console.log(err);
      });
  });


  
  
  module.exports=router;