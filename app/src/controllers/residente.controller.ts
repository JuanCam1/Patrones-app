import { Request, Response } from "express";
import residentFlyweightFactory from "../flyweight/ResidenteFlyweightFactory";
import DBConnection from "../../DbConnection";
import { RowDataPacket } from "mysql2";

// Obtener todos los residentes
export const getAllResidents = async (req: Request, res: Response) => {
  console.time("Flyweight - Obtener Residentes");
  try {
    const db = DBConnection.getInstance();
    const residents = (await db.query(
      "SELECT * FROM residents"
    )) as RowDataPacket[];

    if (Array.isArray(residents)) {
      // Asignar flyweights para cada residente
      const flyweightResidents = residents.map((resident: any) => {
        const flyweight = residentFlyweightFactory.getResidentFlyweight(
          resident.ciudad,
          resident.tipo_edificio
        );
        return flyweight.createResident(
          resident.nombre_residente,
          resident.apartamento
        );
      });

      console.timeEnd("Flyweight - Obtener Residentes");
      res.json(flyweightResidents);
    } else {
      res.status(500).json({
        message: "Error: la respuesta de la base de datos no es un array",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los residentes", error });
  }
};
