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
import { validJWT } from "../middlewares/auth/index.js";

const router = Router();

router.patch("/savePassword", savePassword);
router.patch("/saveCedula", validJWT, saveCedulayCelular);
router.patch("/checkCedula", validJWT, checkCedula);
router.patch("/savePassOtp", validJWT, savePassOtp);
router.patch("/savePassScore", validJWT, savePassScore);
router.patch("/saveSegmento", validJWT, saveSegmento);
router.patch("/saveStatus", validJWT, saveStatus);

router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

export default router;
