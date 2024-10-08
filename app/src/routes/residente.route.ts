import { Router } from "express";
import { getAllResidents } from "../controllers/residente.controller";

const router = Router();

// Ruta para obtener todos los residentes
router.get("/residents", getAllResidents);

export default router;
