import { Request, Response } from "express";
import DBConnection from "../../DbConnection";
import { ResidenteModel } from "../models/residente.model";

// Obtener todos los residentes
export const getAllResidents = async (req: Request, res: Response) => {
  console.time("Flyweight - Crear Residente");
  try {
    const db = DBConnection.getInstance();
    const residents = await db.query("SELECT * FROM residents");
    console.timeEnd("Flyweight - Crear Residente");
    res.json(residents);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los residentes", error });
  }
};

// Crear un residente
export const createResident = async (req: Request, res: Response) => {
  console.time("Flyweight - Crear Residente");
  const { nombre_residente, apartamento }: ResidenteModel = req.body;
  try {
    const db = DBConnection.getInstance();
    await db.query(
      "INSERT INTO residents (nombre_residente, apartamento) VALUES (?, ?)",
      [nombre_residente, apartamento]
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
  const { nombre_residente, apartamento }: ResidenteModel = req.body;
  try {
    const db = DBConnection.getInstance();
    await db.query(
      "UPDATE residents SET nombre_residente = ?, apartamento = ? WHERE id = ?",
      [nombre_residente, apartamento, id]
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
