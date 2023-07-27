import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { 
    validateRequest,
    NotFoundError, 
    NotAuthorizedError,
    requireAuth, 
    BadRequestError} from '@crescenttheaters/common';
import { Ticket } from '../models/tickets';

import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    body('price')
        .isFloat({ gt: 0})
        .withMessage('Must provide valid price')
], validateRequest, async (req: Request, res: Response) => {
    
    const ticket = await Ticket.findById(req.params.id);

    if(!ticket){
        throw new NotFoundError();
    }

    if(ticket.orderId){
        throw new BadRequestError('Ticket is reserved');
    }

    if(ticket.userId != req.currentUser!.id){
        throw new NotAuthorizedError();
    }
    
    ticket.set({
        title: req.body.title,
        price: req.body.price
    });
    await ticket.save();

    new TicketUpdatedPublisher(natsWrapper.client).publish({ // Publishing event with ticket info to NATS Streaming Server event bus
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        version: ticket.version,
        userId: ticket.userId
    });

    res.send(ticket);
});

export { router as updateTicketRouter }

