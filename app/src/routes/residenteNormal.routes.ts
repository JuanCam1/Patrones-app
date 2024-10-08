import { Router } from "express";
import { getAllResidents } from "../controllers/residenteNormal.controller";

const routerNormal = Router();

// Ruta para obtener todos los residentes
routerNormal.get("/residents", getAllResidents);

export default routerNormal;
