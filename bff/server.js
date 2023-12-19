const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;

// Ruta para obtener la configuración de microfrontends
app.get("/microfrontends-config", async (req, res) => {
  try {
    // Recupera la configuración desde un servicio o un archivo JSON remoto
    const microfrontendsConfig = await getMicrofrontendsConfig();
    res.json(microfrontendsConfig);
  } catch (error) {
    console.error("Error fetching microfrontends config:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Función para obtener la configuración de microfrontends desde un servicio o archivo JSON remoto
const getMicrofrontendsConfig = async () => {
  try {
    // Por simplicidad, en este ejemplo se utiliza un archivo JSON local
    const response = await axios.get(
      "http://path/to/your/microfrontends-config.json"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching microfrontends config:", error);
    throw error;
  }
};

app.listen(port, () => {
  console.log(`BFF listening at http://localhost:${port}`);
});
