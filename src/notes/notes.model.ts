import { Document, Schema, Types } from 'mongoose';

export const NotesSchema = new Schema({
  title: String,
  description: String,
  created_by: {
    type: Types.ObjectId,
    ref: 'User'
  }
});

// export enum TaskStatus {
//   OPEN = 'OPEN',
//   IN_PROGRESS = 'IN_PROGRESS',
//   DONE = 'DONE'
// }

export interface INotes extends Document {
  _id: string;
  title: string;
  description: string;
  created_by: string;
}
