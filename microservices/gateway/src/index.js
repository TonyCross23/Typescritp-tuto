import exprss from "express"
import proxy from "express-http-proxy"
import cors from "cors"

const app = exprss();
app.use(cors())
app.use(exprss.json())
const port = 4000;

app.use("/shopping", proxy("http://localhost:4003"))
app.use("/customer", proxy("http://localhost:4001"))
app.use("/", proxy("http://localhost:4002"))

app.listen(port, () => {
  console.log(`products server is running on port ${port}`);
})
