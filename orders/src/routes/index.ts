import express, {Request, Response} from 'express';
import { requireAuth } from '@crescenttheaters/common';
import { Order } from '../models/orders';

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
    
    const orders = await Order.find({
        userId: req.currentUser!.id
    }).populate({
        path: 'ticket',
        populate: {
            path: 'location',
            model: 'LocationOrder'
        }});
    
    //.populate('ticket');

    res.send(orders);  

});

export { router as indexOrderRouter };