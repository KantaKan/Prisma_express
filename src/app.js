import express from "express";
import "dotenv/config";
import db from "./prisma-client.js";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>hello world</h1>");
});

app.get("/users", async (req, res, next) => {
  const users = await db.user.findMany();
  return res.json(users);
});

app.get("/users/:id", async (req, res, next) => {
  const params = req.params;
  const id = params.id;

  const user = await db.user.findUnique({ where: { id: +id } });
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  res.json(user);
});

app.post("/users", async (req, res, next) => {
  const { email, name, password, isAdmin = false } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({ message: "All field are require" });
  }

  const newUser = await db.user.create({});
});

app.listen(PORT, () => {
  console.log("server is running at", PORT);
});
