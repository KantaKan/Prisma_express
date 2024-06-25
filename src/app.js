import express from "express";
import "dotenv/config";
import db from "./prisma-client.js";
import userRoute from "./router/user-route.js";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>hello world</h1>");
});

app.use("/users", userRoute);

app.listen(PORT, () => {
  console.log("server is running at", PORT);
});
