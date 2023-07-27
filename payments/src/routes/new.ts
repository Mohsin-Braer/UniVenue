import express, { Request, Response } from "express";
import { body } from "express-validator";
import { 
    requireAuth,
    validateRequest,
    BadRequestError,
    NotFoundError,
    NotAuthorizedError,
    OrderStatus,
} from "@crescenttheaters/common";
import { OrderPayment } from "../models/order";
import { Payment } from "../models/payments";
import { stripe } from "../stripe";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post('/api/payments', requireAuth, 
[
    body('token')
        .not()
        .isEmpty()
        .withMessage('Invalid token or orderId'),
    body('orderId')
        .not()
        .isEmpty()
        .withMessage('Invalid token or orderId')
], validateRequest,  async (req: Request, res: Response) => {

    const {orderId, token} = req.body;

    const order = await OrderPayment.findById(orderId);

    console.log("KEY: " + process.env.STRIPE_KEY);

    if(!order){
        throw new NotFoundError();
    }

    if(order.userId !== req.currentUser!.id){ //currentUser attempting to start a payment must be the same user assigned to an order
        throw new NotAuthorizedError();
    }

    if(order.status === OrderStatus.Cancelled){
        throw new BadRequestError('order has been cancelled');
    }

    const charge = await stripe.charges.create({
        amount: order.price * 100,
        currency: 'usd',
        source: token
    });

    const payment = Payment.build({
        orderId,
        chargeId: charge.id
    })
    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
        id: payment.id,
        orderId: payment.orderId,
        chargeId: payment.chargeId,
    });

    res.status(201).send({ id: payment.id});

});

export { router as createPaymentRouter };