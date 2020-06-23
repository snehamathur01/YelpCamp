var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var express = require("express");
var methodOverride=require("method-override");
app=express();

mongoose.connect("mongodb://localhost/assignment",{useNewUrlParser: true , useUnifiedTopology:true});
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

mongoose.connect('mongodb+srv://sneha:xxx@cluster0-nanb6.mongodb.net/xxx?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology:true });
var assSchema = new mongoose.Schema({
	name: String,
	age: Number,
	std: String
});
var ass=mongoose.model("assignment",assSchema);



//RESTFUL ROUTES
app.get("/",function(req,res){
	res.redirect("/assignment");
});

// INDEX ROUTE
app.get("/assignment", function(req, res){
   ass.find({}, function(err, assignment){
       if(err){
           console.log("ERROR!");
       } else {
		   console.log(assignment);
          res.render("index", {assignment: assignment}); 
		  
       }
   });
});

// NEW ROUTE
app.get("/assignment/new", function(req, res){
    res.render("new");
});

// CREATE ROUTE
app.post("/assignment", function(req, res){
    // create new student
    console.log(req.body);
    console.log("===========")
    ass.create(req.body.ass, function(err, newStu){
        if(err){
            res.render("new");
        } else {
            //then, redirect to the index
            res.redirect("/assignment");
        }
    });
});


// EDIT ROUTE
app.get("/assignment/:id/edit", function(req, res){
    ass.findById(req.params.id, function(err, foundStu){
        if(err){
            res.redirect("/assignment");
        } else {
			res.render("edit", {Stu: foundStu});
        }
    });
})


// UPDATE ROUTE
app.put("/assignment/:id", function(req, res){
   
   ass.findByIdAndUpdate(req.params.id, req.body.asss, function(err, updatedStu){
      if(err){
          res.redirect("/assignment");
      }  else {
		  
          res.redirect("/assignment");
      }
   });
});


// DELETE ROUTE
app.delete("/assignment/:id", function(req, res){
   //destroy blog
   ass.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/assignment");
       } else {
           res.redirect("/assignment");
       }
     })
	//redirect somewhere
   });

   
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});