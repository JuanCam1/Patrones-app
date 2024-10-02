import { Router } from "express";
import {
  getAllResidents,
  createResident,
  updateResident,
  deleteResident,
} from "../controllers/residenteNormal.controller";

const routerNormal = Router();

// Ruta para obtener todos los residentes
routerNormal.get("/residents", getAllResidents);

// Ruta para crear un nuevo residente
routerNormal.post("/residents", createResident);

// Ruta para actualizar un residente existente
routerNormal.put("/residents/:id", updateResident);

// Ruta para eliminar un residente
routerNormal.delete("/residents/:id", deleteResident);

export default routerNormal;
