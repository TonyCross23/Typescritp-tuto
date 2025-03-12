import express from "express";
import cors from "cors";
import { db } from "../Config/db.config";
import { router } from "../Routes/todo.routes";

const app = express();
const port = 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/todo", router);

//db connection then server connection
db.then(() => {
  app.listen(port, () => console.log(`Server is listening on port ${port}`));
});
