import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@crescenttheaters/common';
import { Ticket } from '../models/tickets';

import { natsWrapper } from '../nats-wrapper';
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher';

const router = express.Router();

router.post('/api/tickets', requireAuth, [
    body('title')
        .not()
        .isEmpty()
        .withMessage("Title is required"),
    body('price')
        .isFloat({gt: 0})
        .withMessage("Price has to be greater than 0")


], validateRequest, async (req: Request, res: Response) => {

    const {title, price} = req.body;

    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    });
    await ticket.save();

    await new TicketCreatedPublisher(natsWrapper.client).publish({ // Publishing event with ticket info to NATS Streaming Server event bus
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        version: ticket.version,
        userId: ticket.userId
    });

    res.status(201).send(ticket);
});

export { router as createTicketRouter };