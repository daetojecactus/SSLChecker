import express, { Router } from "express";
import { getSSLInfo } from "../controllers/SSLInfoController";

const router: Router = express.Router();

router.post("/", getSSLInfo);

export default router;
