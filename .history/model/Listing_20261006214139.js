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
         
            default: "https://tse2.mm.bing.net/th/id/OIP.hx9kvoHQqY64hoKA7fzwQgHaDu?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
        }
    },

    price: {
        type: Number,
        required: true
    },

    location: {
        type: String,
       
    },

    country: {
        type: String,
        
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;