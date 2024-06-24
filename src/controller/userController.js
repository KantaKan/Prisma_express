import db from "../prisma-client.js";

const getAllUsers = async (req, res, next) => {
  const users = await db.user.findMany();
  return res.json(users);
};

const getUserById = async (req, res, next) => {
  const params = req.params;
  const id = params.id;

  const user = await db.user.findUnique({ where: { id: +id } });
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  res.json(user);
};

const register = async (req, res, next) => {
  const { email, name, password, isAdmin = false } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({ message: "All field are require" });
  }

  // if (password !== confirmPassword) {
  //   return res.status(400).json({ message: "password is not match" });
  // }
  const existUser = await db.user.findUnique({ where: { email: email } });
  if (existUser) {
    res.status(400).json({ message: "email is already used" });
  }
  const newUser = await db.user.create({
    data: {
      email: email,
      name: name,
      password: password,
      isAdmin: isAdmin,
    },
  });
  res.status(201).json({ message: "created users", newUser });
};

export { getAllUsers, getUserById, register };
