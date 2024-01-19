import express from 'express';
const router = express.Router();
import { Agent } from '../models/agentModel.js';

router.post('/support-agents', async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.email ||
      !request.body.name ||
      !request.body.name
    ) {
      return response.status(400).send({
        message: 'Send all required fields: name, email, phone, description',
      });
    }
    const newAgent = {
      name: request.body.name,
      email: request.body.email,
      phone: request.body.phone,
      description: request.body.description,
    };

    const agent = await Agent.create(newAgent);

    return response.status(201).send({ 
      message: 'Agent created successfully',
      agent: {
        id: agent._id,
        name: agent.name,
        email: agent.email,
        phone: agent.phone,
        description: agent.description
      }
    });
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;