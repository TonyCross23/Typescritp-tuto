import express, { Express } from "express";

const app: Express = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("running");
});
