import express from 'express';
import { Agent } from '../models/agentModel.js';
import { Ticket } from '../models/ticketModel.js';

const router = express.Router();

router.post('/support-tickets', async (request, response) => {
  try {
    if (
      !request.body.topic ||
      !request.body.description ||
      !request.body.severity ||
      !request.body.type
    ) {
      return response.status(400).send({
        message: 'Send all required fields: topic, description, severity, type',
      });
    }

    const agents = await Agent.find({});
    const assignedAgent = agents[0]; 
    const assignedAgentId = assignedAgent._id;


    const newTicket = {
      topic: request.body.topic,
      description: request.body.description,
      severity: request.body.severity,
      type: request.body.type,
      assignedTo: assignedAgentId,
      status: request.body.status,
      resolvedOn: request.body.resolvedOn,
      dateCreated: request.body.dateCreated
    };

    const ticket = await Ticket.create(newTicket);

    await Agent.findByIdAndUpdate(assignedAgentId, { $push: { assignedTickets: ticket._id } });

    return response.status(201).send({ 
      message: 'Ticket created successfully',
      ticket: {
        id: ticket._id,
        topic: ticket.topic,
        description: ticket.description,
        severity: ticket.severity,
        type: ticket.type,
        assignedTo: assignedAgentId,
        status: ticket.status,
        resolvedOn: ticket.resolvedOn,
        dateCreated: ticket.dateCreated
      }
    });
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


export default router;