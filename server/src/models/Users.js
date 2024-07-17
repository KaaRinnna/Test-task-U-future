import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    secondName: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
}, { timestamps: true })

export const UsersModel = mongoose.model("users", UsersSchema);