import { Listener, Subjects, PaymentCreatedEvent, NotFoundError } from "@crescenttheaters/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order, OrderStatus } from "../../models/orders";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent>{
   
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: { id: string; orderId: string; chargeId: string; }, msg: Message) {
        
       const order = await Order.findById(data.orderId);

       if(!order){
        throw new NotFoundError();
       }

       order.set({
            status: OrderStatus.Complete
       });
       await order.save();

       msg.ack();
        
    }
}