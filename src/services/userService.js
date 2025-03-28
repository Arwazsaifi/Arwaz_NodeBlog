const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { uploadToCloudinary } = require("../utils/cloudinary");

async function registerUser(email, password, profileImage) {
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error("Email already in use");

        let profileImageUrl = null;
        if (profileImage) {
            profileImageUrl = await uploadToCloudinary(profileImage);
        }

        const user = new User({ email, password, profileImage: profileImageUrl });
        const savedUser = await user.save();

        return {
            data: savedUser,
            message: "User registered successfully"
        };
    } catch (error) {
        throw new Error(`Error registering user: ${error.message}`);
    }
}

async function loginUser(email, password) {
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error("Invalid credentials");

        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error("Password does not match");

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return {
            message: "Login successful",
            token,
        };
    } catch (error) {
        throw new Error(`Error logging in: ${error.message}`);
    }
}

module.exports = { registerUser, loginUser };
