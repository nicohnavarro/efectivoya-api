import { Router } from "express";
import {
  checkCedula,
  forgotPassword,
  resetPassword,
  saveCedulayCelular,
  savePassOtp,
  savePassScore,
  savePassword,
  saveSegmento,
  saveStatus,
} from "../controllers/users.js";

const router = Router();

router.post("/checkCedula", checkCedula);
router.post("/saveCedula", saveCedulayCelular);
router.post("/savePassword", savePassword);
router.post("/savePassOtp", savePassOtp);
router.post("/savePassScore", savePassScore);
router.post("/saveSegmento", saveSegmento);
router.post("/saveStatus", saveStatus);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

export default router;
