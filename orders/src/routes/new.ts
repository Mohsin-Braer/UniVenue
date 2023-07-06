import express, {Request, Response} from 'express';
import { BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@crescenttheaters/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';

import { TicketOrder } from '../models/tickets';
import { Order } from '../models/orders';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post('/api/orders', requireAuth, [
   body('ticketId')
    .not()
    .isEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input)) // custom check to make sure id follow mongodb id structure
    .withMessage('Ticket ID must be provided')   
], validateRequest, async (req: Request, res: Response) => {
    const {ticketId} = req.body

    //find ticket user is trying to order
    const ticket =  await TicketOrder.findById(ticketId);

    if(!ticket){
        throw new NotFoundError();
    }

    //make sure ticket is not already reserved
    const isReserved = await ticket.isReserved();
    if(isReserved){
        throw new BadRequestError('Ticket has already been reserved');
    }

    //calculate expiration date for order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    //Build the order and save to model
    const order = Order.build({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticket: ticket
    });
    await order.save();

    //publish event to NATS saying order was created

    res.send({});  

});

export { router as newOrderRouter };