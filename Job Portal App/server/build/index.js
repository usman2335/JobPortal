"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 5000;
const isProduction = process.env.NODE_ENV === "production";
const mongoURI = isProduction
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/users", userRoutes_1.default);
app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`);
});
mongoose_1.default
    .connect(mongoURI)
    .then(() => console.log(`MongoDB connected to ${isProduction ? "PROD" : "DEV"} DB`))
    .catch((error) => console.error("MongoDB connection error:", error));
