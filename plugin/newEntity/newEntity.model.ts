import { Document, Schema, Types } from 'mongoose';

export const NewEntitySchema = new Schema({
  name: String,
  value: String
});

export interface INewEntity extends Document {
  _id: string;
  name: string;
  value: string;
}
