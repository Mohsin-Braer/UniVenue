import { Listener, Subjects, OrderCreatedEvent, OrderStatus } from "@crescenttheaters/common";
import { OrderPayment } from "../../models/order";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: { id: string; userId: string; status: OrderStatus; expiresAt: string; version: number; ticket: { id: string; price: number; }; }, msg: Message) {
        
        const order = OrderPayment.build({
           id: data.id,
           userId: data.userId,
           status: data.status,
           version: data.version,
           price: data.ticket.price 
        });

        await order.save();

        msg.ack();
        
    }

}