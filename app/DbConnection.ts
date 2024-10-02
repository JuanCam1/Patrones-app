import mysql, { Pool } from "mysql2/promise";
import config from "./config";

const user = config.get("user");
const password = config.get("password");
const database = config.get("database");

class DBConnection {
  private static instance: DBConnection;
  private pool: Pool;

  private constructor() {
    // Configuración de la conexión a MySQL
    this.pool = mysql.createPool({
      host: "localhost",
      user: user,
      password: password,
      database: database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  // Método estático para obtener la instancia única
  public static getInstance(): DBConnection {
    if (!DBConnection.instance) {
      DBConnection.instance = new DBConnection();
    }
    return DBConnection.instance;
  }

  // Método para ejecutar consultas a la base de datos
  public async query(sql: string, values?: any[]) {
    const [results] = await this.pool.execute(sql, values);
    return results;
  }
}

export default DBConnection;
