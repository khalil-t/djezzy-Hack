import express from "express"
import { login , logout , signup } from "../controllers/auth.controller.js"
import protectRoute from "../middleware/authMiddleware.js"
const router =express.Router()


router.post("/signup",protectRoute,signup)

router.post("/login",protectRoute,login)

    router.post("/logout",protectRoute,logout)

export default router ;