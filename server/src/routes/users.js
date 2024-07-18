import express from "express";
import multer from 'multer';
import {v4 as uuidv4} from 'uuid';
import path from 'path';
import { UsersModel } from "../models/Users.js"

const router = express.Router();
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

let upload = multer({ storage, fileFilter });

router.get("/", async (req, res) => {
    try {
        const users = await UsersModel.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.json(err);
    }
});

router.post("/", upload.single('photo'), async (req, res) => {
    const photo = req.file ? req.file.filename : null;
    const newUserData = {
        ...req.body,
        photo
    }
    const user = new UsersModel(newUserData);
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