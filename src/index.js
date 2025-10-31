import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/user/index.js";
import todoRoutes from "./routes/todo/index.js";
import { fileURLToPath } from "url";
import sequelize from "./config/db.js";
import nodeCron from "node-cron";
import { startTaskNotifier } from "./cron/task.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRoutes)
app.use("/api/todo", todoRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully.");

        await sequelize.sync({ alter: false });
        console.log("📦 Models synchronized.");

        startTaskNotifier();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("❌ Unable to connect to the database:", err.message);
    }
});