import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js"
import ErrorHandler from "../middleware/error.js"

export const addNewUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        console.log(req.body)
        let user = await User.findOne({ email })

        if (user) return next(new ErrorHandler("User ALready Exist", 404))

        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({ name, email, password: hashedPassword })

        sendCookie(user, res, "Registered Succesfully", 201)
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email }).select("+password")

        if (!user) return next(new ErrorHandler("User Doesn't Exist", 404))

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return next(new ErrorHandler("Password not Match", 404))

        sendCookie(user, res, `Welcome Back, ${user.name}`, 200)
    } catch (error) {
        next(error)
    }
}

export const specialFunc = (req, res) => {
    res.json({
        success: true,
        message: "jocking"
    })
}

export const findByToken = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    })
}

export const logout = (req, res) => {
    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true
        })
        .json({
            success: true,
            user: req.user,
        })
}

export const updateUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    res.json({
        success: true,
        message: "Updated"
    })
}

export const deleteUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)

    res.json({
        success: true,
        message: "Deleted"
    })
}