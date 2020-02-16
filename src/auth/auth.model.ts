import { Document, Schema } from 'mongoose';

export const UsersSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: String
});

export interface IUser extends Document {
  _id: string;
  userName: string;
  password: string;
  salt: string;
}
