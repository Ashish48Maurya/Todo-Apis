import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../../models/index.js"; 
import { ApiResponse, ApiError } from "../../utilities/index.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            return res
                .status(400)
                .json(ApiError.BadRequest("Name, email, and password are required."));
        }
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser)
            return res
                .status(400)
                .json(ApiError.BadRequest("Email is already registered."));
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        return res
            .status(201)
            .json(new ApiResponse(201, newUser, "User registered successfully."));
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json(ApiError.InternalServerError());
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res
                .status(400)
                .json(ApiError.BadRequest("Email and password are required."));
        }
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json(ApiError.NotFound("User not found."));

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json(ApiError.Unauthorized("Invalid credentials."));

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
        const userData = user.toJSON();
        delete userData.password;

        return res
            .status(200)
            .cookie("token", token, { httpOnly: true })
            .json(new ApiResponse(200, { token, user: userData }, "Login successful."));

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json(ApiError.InternalServerError());
    }
};