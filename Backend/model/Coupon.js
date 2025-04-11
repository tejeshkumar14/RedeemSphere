const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    title: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String, required: true },
    companyName: {type: String, required: true},
    companyLink: { type: String, required: true },
    expiry: { type: Date, required: true }, // Now stored as Date type
    username: { type: String, required: true }, // Automatically set from session
    status: {
        type: String,
        enum: ['onSale', 'sold', 'bought'],
        default: 'onSale'
    },
    boughtBy: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model("Coupon", couponSchema);