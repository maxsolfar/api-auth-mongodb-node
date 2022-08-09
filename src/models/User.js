import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword = async (password)=>{
  const saltPassword = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, saltPassword);
  return hashed;
}

userSchema.statics.comparePassword = async (password, receivedPassword)=>{
  const compared = await bcrypt.compare(password, receivedPassword);
  return compared;
}


export default model('User', userSchema);
