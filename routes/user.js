import express from "express";
import { addNewUser, deleteUser, findByToken, login, logout, specialFunc, updateUser } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router()

router.post("/new", addNewUser)

router.post("/login", login)

router.get("/logout", logout)

router.get("/me",isAuthenticated,findByToken)

export default router