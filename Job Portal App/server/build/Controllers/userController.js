"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const User_1 = require("../Models/User");
const registerUser = (req, res) => {
    const { fullName, email, password } = req.body;
    const newUser = new User_1.userModel({ fullName, email, password });
    newUser
        .save()
        .then(() => res.status(201).send("User registered successfully"))
        .catch((error) => res.status(400).send("Error registering user"));
};
exports.registerUser = registerUser;
