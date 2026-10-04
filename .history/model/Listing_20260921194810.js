const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    description: String,

    image: {
        filename: {
            type: String
        },
        url: {
            type: String,
            required: true,
            default: "https://th.bing.com/th/id/OIP.Y2ra-oAZChsDKIY3npr8NQHaHa?w=185&h=185&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
        }
    },

    price: Number,

    location: String,

    country: String
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;