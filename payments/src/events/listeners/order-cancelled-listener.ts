import { Listener, Subjects, OrderCancelledEvent, NotFoundError, OrderStatus } from "@crescenttheaters/common";
import { queueGroupName } from "./queue-group-name";
import { OrderPayment } from "../../models/order";
import { Message } from "node-nats-streaming";


export class OrderCancelledListener extends Listener<OrderCancelledEvent>{

    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName: string = queueGroupName;

    async onMessage(data: { id: string; version: number; ticket: { id: string; }; }, msg: Message) {
        
        const order = await OrderPayment.findByEvent(data);

        if(!order){
            throw new NotFoundError();
        }

        order.set({
            status: OrderStatus.Cancelled
        })
        await order.save();
    }
}