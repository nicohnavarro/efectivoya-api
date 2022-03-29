import { Router } from "express";
import {
  checkCedula,
  forgotPassword,
  resetPassword,
  saveCedulayTelefono,
  savePassword,
} from "../controllers/users.js";

const router = Router();

router.post("/checkCedula", checkCedula);
router.post("/saveCedula", saveCedulayTelefono);
router.post("/savePassword", savePassword);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

export default router;
