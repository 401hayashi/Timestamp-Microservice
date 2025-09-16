const express = require("express");
const cors = require("cors");

const app = express();

// Habilita CORS (para que freeCodeCamp pueda validar tu API)
app.use(cors({ optionsSuccessStatus: 200 }));

// Ruta inicial opcional
app.get("/", (req, res) => {
  res.send("Timestamp Microservice");
});

// Ruta principal de la API
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;
  let date;

  // Si no hay parámetro → devolver fecha actual
  if (!dateParam) {
    date = new Date();
  } else {
    // Si es un número → timestamp en milisegundos
    if (/^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // Validación de fecha
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Respuesta JSON
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Puerto dinámico (Render, Replit, etc.)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});

