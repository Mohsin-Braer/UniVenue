import express, {Request, Response} from 'express';
import { NotFoundError } from '@crescenttheaters/common';
import { Ticket } from '../models/tickets';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {

    const ticket = await Ticket.findById(req.params.id).populate('location');

    if(!ticket){
        throw new NotFoundError();
    }

    res.send(ticket);

});

export { router as showTicketsRouter };