import { Listener, Subjects, OrderCreatedEvent, OrderStatus, NotFoundError } from "@crescenttheaters/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/tickets";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;

    queueGroupName = queueGroupName;

    async onMessage(data: { id: string; userId: string; status: OrderStatus; expiresAt: string; version: number; ticket: { id: string; price: number; }; }, msg: Message) {
        
        const ticket = await Ticket.findById(data.ticket.id);

        if(!ticket){
            throw new NotFoundError();
        }

        ticket.set({
            orderId: data.id
        });
        await ticket.save();
        
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            orderId: ticket.orderId,
            version: ticket.version
        });

        msg.ack();
    } 



} 