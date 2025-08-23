const express =require("express");
const app =express();
const mongoose =require("mongoose");
const path =require("path");
const Listing =require("./models/list.js")

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

main().then(res => {
    console.log("Connected to DB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Rentify');
}


// index route
app.get("/listings", async(req,res)=>{
    const listings = await Listing.find({});
    res.render("./listing/index.ejs",{listings});
})

app.listen(8080,() =>{
    console.log("app is listing at port 8080");
})