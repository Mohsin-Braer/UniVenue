import { Listener, Subjects, ExpirationCompleteEvent, NotFoundError } from "@crescenttheaters/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order, OrderStatus } from "../../models/orders";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";


export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent>{
    
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
    queueGroupName = queueGroupName;

    async onMessage(data: { orderId: string; }, msg: Message) {
        
        const order = await Order.findById(data.orderId).populate('ticket');

        if(!order){
            throw new NotFoundError();
        }

        order.set({
            status: OrderStatus.Cancelled
        });

        await order.save();

        new OrderCancelledPublisher(this.client).publish({
            id: order.id, 
            version: order.version,
            ticket : {
                id: order.ticket.id
            }
        });

        msg.ack();
    }
}