import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs'

//document is a built in mongodb typescript type that allows you to define a schema for a collection adding things like timestamps, auto-incrementing ids, and more

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 4 },
  },
  { timestamps: true }
)
//runs automatically on every save to hash the password
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12)
})

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model<IUser>("User", UserSchema);

export default User;