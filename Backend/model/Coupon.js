const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    title: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String, required: true },
    companyName: {type: String, required: true},
    companyLink: { type: String, required: true },
    expiry: { type: Date, required: true }, // Now stored as Date type
    username: { type: String, required: true } // Automatically set from session
});

module.exports = mongoose.model("Coupon", couponSchema);