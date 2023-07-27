import request from "supertest";
import mongoose, { mongo } from "mongoose";
import { app } from '../../app'
import { Order , OrderStatus} from "../../models/orders";
import { TicketOrder } from "../../models/tickets";
import { natsWrapper } from "../../nats-wrapper";
import { LocationOrder } from "../../models/location";
import { EventCategory } from "@crescenttheaters/common";



it('has a route handler listening to /api/orders for post requests', async () => {
    const response = await request(app)
        .post('/api/orders')
        .send({})

    expect(response.status).not.toBe(404);
});

it('can only be accessed if the user is signed in', async () => {
    await request(app)
        .post('/api/orders')
        .send({})
        .expect(401);
        
});

it('returns a status other than 401 if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({});

    expect(response.statusCode).not.toBe(401);
        
});

it('returns an error if the ticket does not exist', async () => {
    const ticketId = new mongoose.Types.ObjectId();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ticketId})
        .expect(404)
});

it('returns an error if the ticket has already been reserved', async () => {

    const location = LocationOrder.build({
        roomId: 'S123',
        roomType: 'Room',
        university: 'Boston College',
        city: 'Boston',
        state: 'MA',
        imgUrl: 'knffswjf'
      });
      await location.save();

    const ticket = TicketOrder.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
        date: new Date('2023-07-15'),
        category: EventCategory.Community,
        location,
    });
    ticket.save();

    const order = Order.build({
        userId: 'fbfjncnecm',
        status: OrderStatus.Created,
        expiresAt: new Date(),
        ticket
    });
    order.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ticketId: ticket.id})
        .expect(400)
});

it('reserves a ticket successfully', async () => {
    const location = LocationOrder.build({
        roomId: 'S123',
        roomType: 'Room',
        university: 'Boston College',
        city: 'Boston',
        state: 'MA',
        imgUrl: 'knffswjf'
      });
      location.save();

    const ticket = TicketOrder.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
        date: new Date('2023-07-15'),
        category: EventCategory.Community,
        location,
    });
    ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ticketId: ticket.id})
        .expect(201)
});

it('publishes an order created event', async () => {
    const location = LocationOrder.build({
        roomId: 'S123',
        roomType: 'Room',
        university: 'Boston College',
        city: 'Boston',
        state: 'MA',
        imgUrl: 'knffswjf'
      });
      await location.save();

    const ticket = TicketOrder.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
        date: new Date('2023-07-15'),
        category: EventCategory.Community,
        location,
    });
    ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ticketId: ticket.id})
        .expect(201)

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});