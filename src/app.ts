import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import routes from "./Infrastructure/routes";
import { mongoConnect } from "./Infrastructure/mongo/conect/conectDB";
import path from "path";

const envFile = process.argv.includes("dev") ? `.env.local` : ".env";
dotenv.config({ path: path.join(__dirname, `../${envFile}`) });

const port = process.env.PORT ?? 3001;
const app = express();

//Access to db
mongoConnect();

app.use(cors());
app.use(express.json());
app.use(`/api/v1/`, routes);

app.get("/", (req, res) => {
  res.send(`
  <h2>Hey!, espero y este servicio sea de utilizad para tu empresa</h2>
  <p>Servidor de despliegue continuo realizado por <a href="https://www.taurodev.com">Tauro Dev - Software Factory</a></p>
  `);
});

app.listen(port, () =>
  console.log(`Application run in http://localhost:${port}`)
);
