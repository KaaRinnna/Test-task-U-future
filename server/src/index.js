import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from 'path';
import dotenv from "dotenv";
import { usersRouter } from "./routes/users.js";
dotenv.config();

const app = express();
const __dirname = path.resolve();
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use(cors());
app.use("/users", usersRouter);

const mongoPassword = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://umiralikarina:${mongoPassword}@testtaskdb.91cuhe8.mongodb.net/TestDB?appName=TestTaskDB`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  await mongoose.connect(uri, clientOptions);
  await mongoose.connection.db.admin().command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
  app.listen(3001, () => console.log('SERVER STARTED!'));
  
}
run().catch(console.dir);
