var express = require("express");
var router = express.Router();
var Campground=require("../models/campground")
var middleware = require("../middleware");
//1 INDEX - show all campgrounds
router.get("/",function(req,res){
	
	Campground.find({},function(err,allCampgrounds){
	//res.render("campgrounds",{campground:campground});
    	if(err){
	 	console.log("error");
    	}
	   else{
		res.render("campgrounds/index",{campground:allCampgrounds, currentUser:req.user})
	   }
	});
});
	//2 create - add new campgrounds to db
router.post("/", middleware.isLoggedIn, function(req,res){
    var namee=req.body.name;
	var price= req.body.price;
    var imagee=req.body.img;
    var descr=req.body.qwe;
    var authorr={
        id:req.user._id,
        username:req.user.username
    };
    var newCampground={name:namee, price:price, img:imagee,desc:descr,author:authorr};
  Campground.create(newCampground, function(err, newlyCreated){
	  if(err){
		  console.log(err);
	  }
	  else{
		  res.redirect("/campgrounds");
	  }
  });
  
  
});
	//3 form to create new campground
router.get("/new", middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
	
});
//shows more info about a campground	
router.get("/:id", function(req,res){
		Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
			 if(err){
		     console.log(err);
	         }
	         else{
				 console.log(foundCampground);
		     res.render("campgrounds/show", {campground: foundCampground});
	         }
        });
	
		
    });

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	
	Campground.findById(req.params.id, function(err,foundCampground){
		
		res.render("campgrounds/edit",{campground: foundCampground});
	});
});
//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
  //find and update the correct campgrounds
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	})
});




module.exports = router;