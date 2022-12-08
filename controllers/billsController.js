import Bills from "../models/billsModel.js";

export const addBillsController = async (req, res) => {
    try {

        const newBills = await new Bills(req.body);
        await newBills.save();
        res.send("Bill Created Successfully!");
        
        
    } catch (error) {
        console.log(error);
    }
}
