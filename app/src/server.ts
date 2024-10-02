import express from "express";
import residentRoutes from "./routes/residente.route";
import routerNormal from "./routes/residenteNormal.routes";
import config from "../config";

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Usar las rutas de residentes
app.use("/apiF", residentRoutes);
app.use("/apiN", routerNormal);

const port = config.get("port");

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
