"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const User_1 = require("../Models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password, role } = req.body;
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (role !== "recruiter" && role !== "candidate") {
        return res.status(400).json({ message: "Invalid role specified" });
    }
    try {
        const existingUser = yield User_1.userModel.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User already exists with this email" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield User_1.userModel.create({
            fullName,
            email,
            password: hashedPassword,
            role,
        });
        yield newUser.save();
        return res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const user = yield User_1.userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        return res.status(200).json({ message: "Login successful" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.loginUser = loginUser;
