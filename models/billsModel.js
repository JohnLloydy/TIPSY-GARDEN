import mongoose from "mongoose";

const billsSchema = new mongoose.Schema({

    customername: { type: String, required: true },
    customercategory: { type: Number, required: true },
    customerprice: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    shippingfee: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    cartItems: {type: Array, required: true}

}, {
    // for date
    timestamps: true
});

const Bills = mongoose.model("Bills", billsSchema);
export default Bills;