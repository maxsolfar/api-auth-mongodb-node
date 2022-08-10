import Role from "../models/Role";
import User from "../models/User";

export const checkEmail = async (req, res, next) => {
  try {
    const email = req.body.email;
    const foundEmail = await User.findOne({ email: email });
    if (foundEmail) {
      return res.status(400).json({ message: "Email has already exist" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkRoles = async (req, res, next) => {
  try {
    const rolesUser = req.body.roles;

    if (!rolesUser) return res.status(400).json({ message: "No roles" });

    for (let i = 0; i < rolesUser.length; i++) {
      const foundRole = await Role.find({ name: { $in: rolesUser[i] } });
      if (foundRole.length === 0) {
        return res.status(400).json({
          message: `Role ${rolesUser[i]} doesn´t found`,
        });
      }
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
