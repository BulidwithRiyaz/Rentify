const mongoose =require("mongoose");
const Listing =require("../models/list.js")
const initData =require("../init/data.js");

main().then(res => {
    console.log("Connected to DB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Rentify');
}

const initDB = async () => {
   await Listing.deleteMany({});
   await Listing.insertMany(initData.data);
   console.log("data saved successfully");
}

initDB();