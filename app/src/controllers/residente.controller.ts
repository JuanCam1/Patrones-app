import { Request, Response } from "express";
import { ResidenteModel } from "../models/residente.model";
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

// Crear un residente
export const createResident = async (req: Request, res: Response) => {
  console.time("Flyweight - Crear Residente");
  const {
    nombre_residente,
    apartamento,
    ciudad,
    tipo_edificio,
  }: ResidenteModel = req.body;
  try {
    const db = DBConnection.getInstance();

    // Obtener el flyweight para ciudad y tipo de edificio
    const flyweight = residentFlyweightFactory.getResidentFlyweight(
      ciudad,
      tipo_edificio
    );

    await db.query(
      "INSERT INTO residents (nombre_residente, apartamento, ciudad, tipo_edificio) VALUES (?, ?, ?, ?)",
      [nombre_residente, apartamento, flyweight.city, flyweight.buildingType]
    );

    console.timeEnd("Flyweight - Crear Residente");
    res.status(201).json({ message: "Residente creado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el residente", error });
  }
};

// Actualizar un residente
export const updateResident = async (req: Request, res: Response) => {
  console.time("Flyweight - Actualizar Residente");
  const { id } = req.params;
  const {
    nombre_residente,
    apartamento,
    ciudad,
    tipo_edificio,
  }: ResidenteModel = req.body;
  try {
    const db = DBConnection.getInstance();

    // Obtener el flyweight actualizado
    const flyweight = residentFlyweightFactory.getResidentFlyweight(
      ciudad,
      tipo_edificio
    );

    await db.query(
      "UPDATE residents SET nombre_residente = ?, apartamento = ?, ciudad = ?, tipo_edificio = ? WHERE id = ?",
      [
        nombre_residente,
        apartamento,
        flyweight.city,
        flyweight.buildingType,
        id,
      ]
    );

    console.timeEnd("Flyweight - Actualizar Residente");
    res.json({ message: "Residente actualizado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el residente", error });
  }
};

// Eliminar un residente
export const deleteResident = async (req: Request, res: Response) => {
  console.time("Flyweight - Eliminar Residente");
  const { id } = req.params;
  try {
    const db = DBConnection.getInstance();
    await db.query("DELETE FROM residents WHERE id = ?", [id]);

    console.timeEnd("Flyweight - Eliminar Residente");
    res.json({ message: "Residente eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el residente", error });
  }
};
