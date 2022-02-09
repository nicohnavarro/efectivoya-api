import { Router } from "express";
import { checkCedula, login, saveCedulayTelefono, validToken } from "../controllers/auth.js";

const router = Router();

router.post("/login", login);
router.post("/verify", validToken);
router.post("/checkCedula", checkCedula);
router.post("/saveCedula", saveCedulayTelefono);
export default router;
