import express, {Request, Response} from 'express';
import { requireAuth, NotFoundError, NotAuthorizedError } from '@crescenttheaters/common';
import { Order } from '../models/orders';

const router = express.Router();

router.get('/api/orders/:id', async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id).populate('tickets');

    if(!order){
        throw new NotFoundError();
    }

    if(order.userId !== req.currentUser!.id){
        throw new NotAuthorizedError
    }
    
    res.send(order);  

});

export { router as showOrderRouter };