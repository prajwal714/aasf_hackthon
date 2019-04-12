var express= require("express");
var router=express.Router({mergeParams: true});
var passport=require("passport");
router.use(passport.initialize());
router.use(passport.session());
var User=require("../models/user");
var Contactus=require("../models/contactus");

router.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});
//=============
//ROUTES
//=============

router.get("/",function(req,res){
	res.render("home");
});

router.get("/contact", function(req,res){
	res.render("contactus");
});

router.get("/aboutus", function(req,res){
	res.render("aboutus");
});

router.post("/", function(req,res){
	var name=req.body.name;
	var contact=req.body.contact;
	var comment=req.body.comment;
	var newContactus={name:name, contact:contact,comment:comment};
	Contactus.create(newContactus, function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
			console.log("comment aaya");
			res.redirect("/#contact");
		}
	})
});
router.post("/contact", function(req,res){
	var name=req.body.name;
	var contact=req.body.contact;
	var comment=req.body.comment;
	var newContactus={name:name, contact:contact,comment:comment};
	Contactus.create(newContactus, function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
			console.log("comment aaya");
			res.redirect("/#contact");
		}
	})
});
//======================
//auth routes start
//=====================

router.get("/register",function(req,res){
	res.render("register");
});
router.post("/register", function(req,res){
	
	User.register(new User({username:req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			res.render("register");
		}
		console.log(req.body.username+","+req.body.password);
		passport.authenticate("local")(req,res, function(){
			res.redirect("/secret");
		});
	});
});

//=======================
//login routes start
//======================
router.get("/login",function(req,res){
	res.render("login");
});
router.post("/login", passport.authenticate("local",{
	successRedirect:"/secret",
	failureRedirect:"/login"
}) ,function(req,res){

});

router.get("/logout", function(req,res){
	req.logout();
	res.redirect("/");
});

router.get("/secret", isLoggedIn, function(req,res){
	res.render("secret");
});

router.get("/details/our_objective",function(req,res){
	res.render("our_objective");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
module.exports=router;