import express from "express";
import { UsersModel } from "../models/Users.js"

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await UsersModel.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.json(err);
    }
});

router.post("/", async (req, res) => {
    const user = new UsersModel(req.body);
    try {
        const response = await user.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const user = await UsersModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send({ message: 'User deleted' })
    } catch (err) {
        res.status(500).send({ message: 'Error deleting user', error: err.message });
    }
})

export {router as usersRouter};