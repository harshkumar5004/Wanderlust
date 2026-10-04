const express = require("express");
const app = express();

const mongoose = require("mongoose");

const Listing = require("./model/Listing.js");
const path = require('path');
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./ExpressError.js");

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.engine("ejs", ejsMate); 
app.use(express.static(path.join(__dirname, "public")));


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

//home
app.get("/" , async(req , res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs" , {allListing});
});
app.get("/listing" , async(req , res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs" , {allListing});
});
//new route
app.get("/listing/new" , (req , res) => {
    throw new ExpressError(404, "Page not found");
    res.render("listings/new.ejs");
});
//Show route
app.get("/listing/:id" ,async (req ,res) => {
    let {id} = req.params;
   const listing =  await Listing.findById(id);
    res.render("listings/show.ejs" , {listing});
});

app.post("/listings", async (req, res) => {

    let listing = new Listing(req.body.listing);

    listing.image = {
        filename: "listingimage",
        url: req.body.listing.image
    };

    await listing.save();

    res.redirect("/listing");
});

//edit route
app.get("/listing/:id/edit" , async(req , res) =>{
    let {id} = req.params;
   const listing =  await Listing.findById(id);
   res.render("listings/edit.ejs" , {listing});
});

//update route
app.put("/listing/:id" , async(req , res) => {
   let {id} = req.params;
   await Listing.findByIdAndUpdate(id , {...req.body.listing});
   res.redirect("/listing");

});

app.delete("/listing/:id" , async(req , res) => {
    let {id} = req.params;
   let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listing");
})

app.use((err, req, res, next) => {
    res.status( 500).send( "Something went wrong");
});

app.listen(8080, () => {
    console.log("Server is listening");
});