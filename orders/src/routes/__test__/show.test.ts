import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { EventCategory } from '@crescenttheaters/common';
import { TicketOrder } from '../../models/tickets';
import { LocationOrder } from '../../models/location';


it('fetches the order', async () => {
  // Create a ticket
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

  const user = global.signin();
  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make request to fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});


it('returns an error if one user tries to fetch another users order', async () => {
  // Create a ticket
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

  const user = global.signin();
  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make request to fetch the order
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(401);
});
