
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./model/Listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


// =======================
// App Configuration
// =======================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));


// =======================
// Database Connection
// =======================

main()
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}


// =======================
// Test Route
// =======================

app.get("/app", (req, res) => {
    res.send("Working!!");
});


// =======================
// Home Route
// =======================

app.get("/", async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
});


// =======================
// Listing Route
// =======================

app.get("/listing", async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
});


// =======================
// New Route
// =======================

app.get("/listing/new", (req, res) => {
    res.render("listings/new.ejs");
});


// =======================
// Show Route
// =======================

app.get("/listing/:id", async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    res.render("listings/show.ejs", { listing });
});


// =======================
// Create Route
// =======================
app.post("/listing", async (req, res) => {
    const listing = new Listing(req.body.listing);

    if (!listing.image.url) {
        listing.image.url = "https://tse2.mm.bing.net/th/id/OIP.hx9kvoHQqY64hoKA7fzwQgHaDu?r=0&rs=1&pid=ImgDetMain&o=7&rm=3";
    }

    await listing.save();
    res.redirect("/listing");
});

// =======================
// Edit Route
// =======================

app.post("/listing/:id/edit", async (req, res) => {

    const { id } = req.params;

    const listing = await Listing.findById(id);

    res.render("listings/edit.ejs", { listing });
});


// =======================
// Update Route
// =======================

app.put("/listing/:id", async (req, res) => {

    const { id } = req.params;

    await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { runValidators: true }
    );

    res.redirect("/listing");
});


// =======================
// Delete Route
// =======================

app.delete("/listing/:id", async (req, res) => {

    const { id } = req.params;

    const deletedListing = await Listing.findByIdAndDelete(id);

    console.log(deletedListing);

    res.redirect("/listing");
});


// =======================
// Server
// =======================

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

