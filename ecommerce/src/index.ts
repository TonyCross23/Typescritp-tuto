import express, { Express } from "express";
import { PORT } from "./secrets";
import router from "./routers/router";
import { connectDatabase } from "./database/prisma";

const app: Express = express();

connectDatabase();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

//routers
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
