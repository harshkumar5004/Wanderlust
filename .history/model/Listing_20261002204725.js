const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        filename: {
            type: String
        },
        url: {
            type: String,
            required: true,
            default: "https://th.bing.com/th/id/OIP.Y2ra-oAZChsDKIY3npr8NQHaHa"
        }
    },

    price: {
        type: Number,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;