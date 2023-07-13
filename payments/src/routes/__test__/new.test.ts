import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { OrderPayment } from "../../models/order";
import { Payment } from "../../models/payments";
import { OrderStatus } from "@crescenttheaters/common";
import { stripe } from "../../stripe";



it('returns 404 when purchasing order that does not exist', async () => {
    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
            token: 'fbadhfbf',
            orderId: new mongoose.Types.ObjectId().toHexString()  
        })
        .expect(404)
});

it('returns 401 when purchasing order that does not belong to user', async () => {
    
    const order = OrderPayment.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        userId: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        price: 35,
        status: OrderStatus.Created
    })
    await order.save();

    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
            token: 'fbadhfbf',
            orderId: order.id,
        })
        .expect(401)
});

it('returns 400 when purchasing order thats has been cancelled', async () => {
    
    const userId = new mongoose.Types.ObjectId().toHexString();
    const order = OrderPayment.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        userId,
        version: 0,
        price: 35,
        status: OrderStatus.Cancelled
    });
    await order.save();

    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin(userId))
        .send({
            token: 'fbadhfbf',
            orderId: order.id  
        })
        .expect(400)
});

it('returns 201 when purchasing order with valid token and orderId', async () => {
    
    const userId = new mongoose.Types.ObjectId().toHexString();
    const price = Math.floor(Math.random() * 10000);
    const order = OrderPayment.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        userId,
        version: 0,
        price,
        status: OrderStatus.Created
    });
    await order.save();

    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin(userId))
        .send({
            token: 'tok_visa',
            orderId: order.id
        })
        .expect(201)

    const stripeCharges = await stripe.charges.list({limit:30});
    const stripeCharge = stripeCharges.data.find(charge => {
        return charge.amount === price * 100
    })

    expect(stripeCharge).toBeDefined();
    expect(stripeCharge!.currency).toEqual('usd');

    const payment = await Payment.findOne({
        orderId: order.id,
        chargeId: stripeCharge!.id
    })
    expect(payment).not.toBeNull();
});




