import mongoose from "mongoose";

const ticketSchema = mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    description:
    {
      type: String,
      required: true,
    },
    dateCreated:
    {
      type: Date,
      default: Date.now,
    },
    severity:
    {
      type: String,
      enum: ['Low', 'Medium', 'High'],
    },
    type: String,
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agent',
    },
    status: {
      type: String,
      enum: ['New', 'Assigned', 'Resolved'],
      default: 'New',
    },
    resolvedOn: Date,

  });


export const Ticket = mongoose.model('Ticket', ticketSchema);
