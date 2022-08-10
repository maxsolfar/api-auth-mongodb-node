import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";

export const signUp = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }
    const createdUser = await newUser.save();

    const token = jwt.sign({ id: createdUser._id }, config.AUTH, {
      expiresIn: 86400,
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email }).populate("roles");

    if (!foundUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const matchPassword = await User.comparePassword(
      password,
      foundUser.password
    );

    if (!matchPassword) {
      return res.status(401).json({ token: null, message: "Invalid Password" });
    }

    const token = jwt.sign({ id: foundUser._id }, config.AUTH, {
      expiresIn: 86400,
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
