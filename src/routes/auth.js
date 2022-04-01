import { Router } from "express";
import {
  login,
  register,
  loginWithApp,
  validToken,
} from "../controllers/auth.js";

const router = Router();

router.post("/login", login);
router.post("/login", loginWithApp);
router.post("/register", register);
router.post("/verify", validToken);
export default router;
