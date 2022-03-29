import { Router } from "express";
import { login, register, validToken } from "../controllers/auth.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verify", validToken);
export default router;
