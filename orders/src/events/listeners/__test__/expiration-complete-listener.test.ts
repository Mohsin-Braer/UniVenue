import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { OrderStatus, ExpirationCompleteEvent, EventCategory } from "@crescenttheaters/common";
import { ExpirationCompleteListener } from "../expiration-complete-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Order } from "../../../models/orders";
import { TicketOrder } from "../../../models/tickets";
import { LocationOrder } from "../../../models/location";

const setup = async () => {
  const listener = new ExpirationCompleteListener(natsWrapper.client);

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

  const order = Order.build({
    status: OrderStatus.Created,
    userId: "alskdfj",
    expiresAt: new Date('2023-07-16'),
    ticket,
  });
  await order.save();

  const data: ExpirationCompleteEvent["data"] = {
    orderId: order.id,
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, order, ticket, data, msg };
};

it("updates the order status to cancelled", async () => {
  const { listener, order, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("emit an OrderCancelled event", async () => {
  const { listener, order, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const eventData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );
  expect(eventData.id).toEqual(order.id);
});

it("ack the message", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
