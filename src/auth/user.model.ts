import { Document, Schema } from 'mongoose';

export const UsersSchema = new Schema({
  userName: String,
  password: String
});

export interface IUsers extends Document {
  _id: string;
  userName: string;
  password: string;
  // created_by: string;
}
