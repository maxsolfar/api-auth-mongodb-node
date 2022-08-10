import User from "../models/User";

export const createUser = async (req,res) =>{
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email, password});
    const createdUser = await newUser.save();
    return res.status(201).json(createdUser);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
export const getUsers = async (req, res) => {
  try {
    const getUsers = await User.find();
    return res.status(200).json(getUsers);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const userById = await User.findById(userId);
    return res.status(200).json(userById);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const updateUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    return res.status(200).json(deletedUser);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};