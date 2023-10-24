import express from "express";
import { User } from "../models/User.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(403).json({ message: "Username already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const savedUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).send(savedUser);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Incorrect Password" });

    const token = jwt.sign({ id: user._id }, "secret");

    res.json({ token, userId: user._id, username });
  } catch (err) {
    console.log(err);
  }
  res.status(200);
});

export default router;
