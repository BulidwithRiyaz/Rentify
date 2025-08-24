const express =require("express");
const app =express();
const mongoose =require("mongoose");
const path =require("path");
const Listing =require("./models/list.js")
const methodOverride = require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


main().then(res => {
    console.log("Connected to DB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Rentify');
}

// (/) route
app.get("/",(req,res)=>{
    res.redirect("/listings");
})


// index route
app.get("/listings", async(req,res)=>{
    const listings = await Listing.find({});
    res.render("./listing/index.ejs",{listings});
})

//new route
app.get("/listings/new",(req,res)=>{
    res.render("./listing/new.ejs");
})


//create route
app.post("/listings", async (req,res)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    console.log(newListing);
    res.redirect("/listings")
})

//show route 
app.get("/listings/:id" , async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listing/show.ejs",{listing})
})


//edit ejs
app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listing/edit.ejs",{listing});
})

//update route 
app.put("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findByIdAndUpdate(id,{...req.body.listing},{new:true});
    console.log(listing);
    res.redirect(`/listings/${id}`);
})

// delete route
app.delete("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findByIdAndDelete(id);
    console.log(listing);
    res.redirect(`/listings`);
})

app.listen(8080,() =>{
    console.log("app is listing at port 8080");
})