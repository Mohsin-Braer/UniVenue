import express, {Request, Response} from 'express';
import { Ticket } from '../models/tickets';
//import { Location } from '../models/location';

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
    const tickets = await Ticket.find({
        orderId: undefined
    });

    //const locations = await Location.find();

    res.send(tickets);
    //res.send({ticketsList: tickets, locationsLists: locations});
});

export {router as indexTicketsRouter}