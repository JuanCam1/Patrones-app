import { Router } from "express";
import {
  getAllResidents,
  createResident,
  updateResident,
  deleteResident,
} from "../controllers/residente.controller";

const router = Router();

// Ruta para obtener todos los residentes
router.get("/residents", getAllResidents);

// Ruta para crear un nuevo residente
router.post("/residents", createResident);

// Ruta para actualizar un residente existente
router.put("/residents/:id", updateResident);

// Ruta para eliminar un residente
router.delete("/residents/:id", deleteResident);

export default router;
