import { Document, Schema, Types } from 'mongoose';

export enum TicketStatus {
  NEW = 'NEW',
  COMPLETED = 'COMPLETED',
  ENROLLED = 'ENROLLED'
}

export const TicketsSchema = new Schema({
  name: String,
  status: {
    type: String,
    enum: Object.keys(TicketStatus)
  },
  debt: Number,
  owner: {
    type: Types.ObjectId,
    ref: 'Users'
  },
  noteId: {
    type: Types.ObjectId,
    ref: 'Notes'
  }
});

export interface ITicket extends Document {
  _id: string;
  name: string;
  status: TicketStatus;
  debt: number;
  owner: string;
  noteId: string;
}
