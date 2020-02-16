import { Document, Schema, Types } from 'mongoose';

export const NotesSchema = new Schema({
  title: String,
  description: String,
  created_by: {
    type: Types.ObjectId,
    ref: 'Users'
  }
});

export interface INote extends Document {
  _id: string;
  title: string;
  description: string;
  created_by: string;
}
