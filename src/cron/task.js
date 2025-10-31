import nodemailer from "nodemailer";
import nodeCron from "node-cron";
import { Op } from "sequelize";
import { User, Todo } from "../models/index.js"; 


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const checkNewTodosAndNotify = async () => {
    console.log("⏰ Running cron job: checking for new tasks...");

    try {
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

        const newTodos = await Todo.findAll({
            where: {
                created_at: { [Op.gt]: fiveMinutesAgo },
            },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["email", "name"],
                },
            ],
        });

        if (newTodos.length === 0) {
            console.log("✅ No new tasks found in the last 5 minutes.");
            return;
        }

        const userTodosMap = {};
        newTodos.forEach((todo) => {
            const email = todo.user?.email;
            if (!email) return;
            if (!userTodosMap[email]) userTodosMap[email] = [];
            userTodosMap[email].push(todo.title);
        });

        for (const [email, todos] of Object.entries(userTodosMap)) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "📝 New Tasks Added",
                text: `Hello! You have ${todos.length} new task(s) added in the last 5 minutes:\n\n${todos.join("\n")}`,
            };

            await transporter.sendMail(mailOptions);
            console.log(`📩 Sent notification to ${email}`);
        }
    } catch (error) {
        console.error("❌ Error checking or sending notifications:", error);
    }
};

export const startTaskNotifier = () => {
    nodeCron.schedule("*/5 * * * *", checkNewTodosAndNotify);
    console.log("🕔 Cron job scheduled: runs every 5 minutes to check for new tasks.");
};