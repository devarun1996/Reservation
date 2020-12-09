var PORT = 3000;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./routing");

app.use(express.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH'); // methods allowed
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //authorization
    next();
})

mongoose.connect("mongodb://localhost/ReservationPortal", 
{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false // uses old fnc by default
});

const db=mongoose.connection; 
db.on("error", (error)=> console.error(error));
db.once("open", ()=> console.log("Database connected.."));

app.use("/", router);

app.listen(PORT,()=>{
    console.log("Server running...");
})