 /***********************npm modules**********************/
 var express = require('express');
 var mongoose = require('mongoose');

 var bodyParser = require('body-parser');


 
 /***********************npm objects**********************/
 var app = express();
 var port = 8000;
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 
 
 /***********************mongo db connection setup**********************/
 
 mongoose.connect('mongodb://localhost:27017/revfin', 
	{
  	
	 useNewUrlParser: true
	})
.then(()=>{
	console.log('connected');
	})
.catch((e)=>{
	console.log("Something went wrong", e);
	})

 
    
    const authRoute=require("./router/logic_router")
    app.use("/api",authRoute);

  /*********************app listening*********************/

 app.listen(port);
 console.log(`server is running on ${port}`);
 