import mongoose from "mongoose"

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    adress: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'kupac'
    },
})


export const Users = mongoose.model('User', usersSchema, 'users');

