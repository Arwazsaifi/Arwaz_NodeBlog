const userService = require("../services/userService");
const {uploadToCloudinary} = require('../utils/cloudinary')

async function signup(req, res) {
    try {
        const { email, password } = req.body;
        let profileImageUrl = null;

        if (req.file) {
            const format = req.file.mimetype.split("/")[1] || "jpg";
            profileImageUrl = await uploadToCloudinary(req.file.buffer, format);
        }

        const data = await userService.registerUser(email, password, profileImageUrl);

        res.status(201).json({
            status: "success",
            ...data 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}


async function login(req, res) {
    try {
        const { email, password } = req.body;
        const data = await userService.loginUser(email, password);

        res.status(200).send({
            status: "success",
            ...data
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

module.exports = { signup, login };
