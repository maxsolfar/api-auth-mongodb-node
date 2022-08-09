import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';

export const singUp = async(req,res) => {
  const {username, email, password, roles} = req.body;

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password)
  });

  if(roles){
    const foundRoles = await Role.find({name: {$in: roles}});
    newUser.roles = foundRoles.map(role => role._id);
  }else{
    const role = await Role.findOne({name: "user"});
    newUser.roles = [role._id];
  }
  const createdUser = await newUser.save();

  const token = jwt.sign({id: createdUser._id}, config.SECRET, {
    expiresIn: 86400
  });

  res.status(200).json({token});
};

export const singIn = (req,res) => {

};