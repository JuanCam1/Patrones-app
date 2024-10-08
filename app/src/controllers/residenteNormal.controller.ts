import { Request, Response } from "express";
import createDBConnection from "../../DbConnectionNormal";

// Obtener todos los residentes
export const getAllResidents = async (req: Request, res: Response) => {
  console.time("Sin Flyweight - Listar Residentes");
  try {
    const db = await createDBConnection();
    const [residents] = await db.execute("SELECT * FROM residents");
    await db.end(); // Cerrar la conexión después de la consulta
    console.timeEnd("Sin Flyweight - Listar Residentes");
    res.json(residents);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los residentes", error });
  }
};
