import mysql from "mysql2/promise";

// Función que crea una nueva conexión a la base de datos cada vez que se llama
const createDBConnection = async () => {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "juan1216",
    database: "conjuntos_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
};

export default createDBConnection;
