import mongoose from "mongoose";

const obavestenjeSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    obavestenja:[ { text: String }]
})

export const Obavestenje = mongoose.model('Obavestenje', obavestenjeSchema, 'obavestenja');
