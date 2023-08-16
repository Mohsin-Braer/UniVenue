import express, {Request, Response} from 'express';
import { Ticket } from '../models/tickets';
import { Location } from '../models/location';

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
    const tickets = await Ticket.find({
        orderId: undefined
    }).populate('location').sort({date: 1});

    const locations = await Location.find({
        roomType: 'Display',
        roomId: "Display"
    });

    //res.send(tickets);
    res.send({tickets, locations});
});

export {router as indexTicketsRouter}