import User from "../models/User.js";

export const getUsers = async (req, res) => {
  const users = await User.find().select("_id name email role");
  res.json(users);
};

export const makeAdmin = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role: "admin" },
    { new: true }
  );

  res.json(user);
};