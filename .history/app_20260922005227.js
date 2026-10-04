const express = require("express");
const app = express();

const mongoose = require("mongoose");

const Listing = require("./model/Listing.js");
const path = require('path');

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));


main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.get("/app", (req , res) => {
    res.send(`Working!!`)
});

//listing route
app.get("/listing" , async(req , res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs" , {allListing});
});
//new route
app.get("/listing/new" , (req , res) => {
    res.render("listings/new.ejs");
});
//Show route
app.get("/listing/:id" ,async (req ,res) => {
    let {id} = req.params;
   const listing =  await Listing.findById(id);
    res.render("listings/show.ejs" , {listing});
});


// app.get("/test", async (req, res) => {

//     let sampleListing = new Listing({
//         title: "My New House",
//         description: "A beautiful house near the city.",
//         price: 5000,
//         location: "Ranchi",
//         country: "India"
//     });

//     await sampleListing.save();

//     console.log("Sample listing saved");

//     res.send("Sample listing created");
// });



app.listen(8080, () => {
    console.log("Server is listening");
});