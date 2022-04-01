import { Router } from "express";
import {
  checkCedula,
  forgotPassword,
  resetPassword,
  saveCedulayCelular,
  savePassOpt,
  savePassword,
  saveSegmento,
} from "../controllers/users.js";

const router = Router();

router.post("/checkCedula", checkCedula);
router.post("/saveCedula", saveCedulayCelular);
router.post("/savePassword", savePassword);
router.post("/savePassOtp", savePassOpt);
router.post("/saveSegmento", saveSegmento);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

export default router;
