import { Request, Response } from "express";
import createDBConnection from "../../DbConnectionNormal";
import { ResidenteModel } from "../models/residente.model";

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

// Crear un residente
export const createResident = async (req: Request, res: Response) => {
  console.time("Sin Flyweight - Crear residente");
  const { nombre_residente, apartamento }: ResidenteModel = req.body;
  try {
    const db = await createDBConnection();
    await db.execute(
      "INSERT INTO residents (nombre_residente,apartamento) VALUES (?, ?)",
      [nombre_residente, apartamento]
    );
    await db.end(); // Cerrar la conexión
    console.timeEnd("Sin Flyweight - Crear residente");
    res.status(201).json({ message: "Residente creado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el residente", error });
  }
};

// Actualizar un residente
export const updateResident = async (req: Request, res: Response) => {
  console.time("Sin Flyweight - Actualizar residente");
  const { id } = req.params;
  const { nombre_residente, apartamento }: ResidenteModel = req.body;
  try {
    const db = await createDBConnection();
    await db.execute(
      "UPDATE residents SET name = ?, age = ?, apartment = ? WHERE id = ?",
      [nombre_residente, apartamento, id]
    );
    await db.end(); // Cerrar la conexión
    console.timeEnd("Sin Flyweight - Actualizar residente");
    res.json({ message: "Residente actualizado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el residente", error });
  }
};

// Eliminar un residente
export const deleteResident = async (req: Request, res: Response) => {
  console.time("Sin Flyweight - Eliminar residente");
  const { id } = req.params;
  try {
    const db = await createDBConnection();
    await db.execute("DELETE FROM residents WHERE id = ?", [id]);
    await db.end(); // Cerrar la conexión
    console.timeEnd("Sin Flyweight - eliminar residente");
    res.json({ message: "Residente Eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el residente", error });
  }
};
