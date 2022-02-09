import { Router } from "express";
import { login, validToken } from "../controllers/auth.js";

const router = Router();

router.post("/login", login);
router.post("/verify", validToken);
export default router;
