import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { EventCategory, requireAuth, validateRequest } from '@crescenttheaters/common';
import { Ticket } from '../models/tickets';
import { Location, LocationDoc } from '../models/location';

import { natsWrapper } from '../nats-wrapper';
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher';

const router = express.Router();

router.post('/api/tickets', requireAuth, [
    body('title')
        .not()
        .isEmpty()
        .withMessage("Title required"),
    body('price')
        .isFloat({gt: 0})
        .withMessage("Price has to be greater than 0"),
    body('date')
        .isDate()
        .withMessage("Not a valid date"),
    body('roomType')
        .not()
        .isEmpty()
        .withMessage('Room type required'),
    body('roomId')
        .not()
        .isEmpty()
        .withMessage('Room ID required'),
    body('university')
        .not()
        .isEmpty()
        .withMessage('Room ID required'),
    body('city')
        .not()
        .isEmpty()
        .withMessage('City required'),
    body('state')
        .not()
        .isEmpty()
        .withMessage('State required'),
    body('category')
        .not()
        .isEmpty()
        .withMessage('Type of event required'),
    body('imgUrl')
        .not()
        .isEmpty()
        .withMessage('Image URL required'),


], validateRequest, async (req: Request, res: Response) => {

    const {title, price, date, category, roomType, roomId, university, city, state, imgUrl} = req.body;


    const newUniversity = await Location.findOne({
        roomType: 'Display', 
        roomId: 'Display',
        university
    })

    if(newUniversity === null){
        await Location.build({
            roomType: 'Display', 
            roomId: 'Display',
            university,
            city,
            state, 
            imgUrl
        }).save()
    }

    var location: LocationDoc | null = await Location.findOne({
        roomId,
        university,
        city,
        state,   
    });
    
    if(location === null){
        location = Location.build({
            roomType,
            roomId,
            university,
            city,
            state,
            imgUrl, 
        });
        await location.save();
    }




    const ticket = Ticket.build({
        title,
        price,
        category: category as EventCategory,
        date: new Date(date),
        userId: req.currentUser!.id,
        location,

    });
    await ticket.save();

    await new TicketCreatedPublisher(natsWrapper.client).publish({ // Publishing event with ticket info to NATS Streaming Server event bus
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        version: ticket.version,
        userId: ticket.userId,
        date: ticket.date.toISOString(),
        category: ticket.category,
        location: {
            roomType: location.roomType,
            roomId: location.roomId,
            university: location.university,
            city: location.city,
            state: location.state,
            imgUrl: location.imgUrl,
        },
    });

    res.status(201).send(ticket);
});

export { router as createTicketRouter };