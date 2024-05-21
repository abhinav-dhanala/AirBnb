const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default:"https://unsplash.com/photos/a-building-on-top-of-a-mountain-with-a-moon-in-the-sky-b_qczKSP_X4",
        set: (v) => v === "" ? "https://unsplash.com/photos/a-building-on-top-of-a-mountain-with-a-moon-in-the-sky-b_qczKSP_X4" : v
    },
    price: Number,
    location: String,
    country: String
});

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
