import mongoose from "mongoose"

const proizvodSchema = new mongoose.Schema({
    slika: {
        data: Buffer,
        contentType: String
    },
    naziv: {
        type: String,
        required: true,
    },
    cena: {
        type: String,
        required: true,
    },
    opis: {
        type: String,
        required: true,
    },
    sastav: {
        type: String,
        required: true,
    },
    tip: {
        type: String,
        required: true
    },
    komentar: [{username: String, text: String}]
})


export const Proizvod = mongoose.model('Proizvod', proizvodSchema, 'proizvodi');

