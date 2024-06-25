import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};
