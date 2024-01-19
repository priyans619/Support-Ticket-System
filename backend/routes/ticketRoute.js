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

router.get('/support-tickets', async (request, response) => {
  try {
    const { status, assignedTo, severity, type, sort, order, page = 1, limit = 10 } = request.query;

    // query conditionss
    const queryConditions = {};
    if (status) queryConditions.status = status;
    if (assignedTo) queryConditions.assignedTo = assignedTo;
    if (severity) queryConditions.severity = severity;
    if (type) queryConditions.type = type;

    // sort and order
    const sortOptions = {};
    if (sort) sortOptions[sort] = order === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;

    const tickets = await Ticket.find(queryConditions)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    response.status(200).json({ tickets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;