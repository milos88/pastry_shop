import mongoose from "mongoose";

const korpaSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    proizvodi: [{naziv: String, kolicina: Number}]
    
})

export const Korpa = mongoose.model("Korpa", korpaSchema, "korpa")
