import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find()
    .populate("assignedTo", "name")
    .populate("project", "name");

  res.json(tasks);
};