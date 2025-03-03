//Cargamos la variables de entorno
require("dotenv").config();

const express = require("express");
const app = express();

// Importa las rutas
const openaiRoutes = require("./routes/openaiRoutes");
const sportApiRoutes = require("./routes/sportApiRoutes");

// Middleware para parsear JSON
app.use(express.json());

// Usa las rutas definidas
app.use("/predition", openaiRoutes);
app.use("/api", sportApiRoutes);

// Inicia el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
