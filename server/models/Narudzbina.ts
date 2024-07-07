import mongoose from "mongoose";

const narudzbinaSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    broj_por: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true,
        default: "Aktivan"
    },
    proizvodi: [{naziv: String, kolicina: Number}]
    
})

export const Narudzbina = mongoose.model("Narudzbina", narudzbinaSchema, "narudzbine")