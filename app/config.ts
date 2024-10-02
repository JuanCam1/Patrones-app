import "dotenv/config";

class Config {
  private static instance: Config; // Define la propiedad estática

  private config: { [key: string]: any } = {}; // Define el tipo de la configuración

  constructor() {
    // Verifica si ya existe una instancia de la clase
    if (Config.instance) {
      return Config.instance;
    }

    // Define la configuración
    this.config = {
      port: process.env.PORT,
      user: process.env.USER_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE,
    };

    // Asigna la instancia
    Config.instance = this;
  }

  // Método para obtener un valor de la configuración
  get(key: string) {
    return this.config[key];
  }
}

// Exporta la instancia única de Config
export default new Config();
