import express from "express";
import { getDataScoreStudentByMSSV, loginController } from "../controllers/QuanLyDiemController.js";

const router = express.Router();

router.post("/api/score", getDataScoreStudentByMSSV);
router.post("/api/login", loginController);

export default router;