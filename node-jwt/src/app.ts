import express from "express";
import "./db/db";

const app = express();
const port = process.env.PORT || 1500;

app.use(express.json());
//app.use("/api/users");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
