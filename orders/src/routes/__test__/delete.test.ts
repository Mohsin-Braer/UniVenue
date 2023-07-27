import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { TicketOrder } from '../../models/tickets';
import { LocationOrder } from '../../models/location';
import { Order, OrderStatus } from '../../models/orders';
import { natsWrapper } from '../../nats-wrapper';
import { EventCategory } from '@crescenttheaters/common';

it('marks an order as cancelled', async () => {

  const location = LocationOrder.build({
    roomType: 'classroom',
    roomId: 'S250', 
    university: 'Boston College',
    city: 'Boston',
    state: 'MA',
    imgUrl: 'fjnjndsjnsd'
  });

  // create a ticket with Ticket Model
  const ticket = TicketOrder.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
    date: new Date('2023-07-15'),
    category: EventCategory.Community,
    location,
  });
  await ticket.save();

  const user = global.signin();
  // make a request to create an order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make a request to cancel the order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  // expectation to make sure the thing is cancelled
  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emits a order cancelled event', async () => {
  const location = LocationOrder.build({
    roomType: 'classroom',
    roomId: 'S250', 
    university: 'Boston College',
    city: 'Boston',
    state: 'MA',
    imgUrl: 'fjnjndsjnsd'
  });


  const ticket = TicketOrder.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
    date: new Date('2023-07-15'),
    category: EventCategory.Community,
    location,
  });
  await ticket.save();

  const user = global.signin();
  // make a request to create an order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make a request to cancel the order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
