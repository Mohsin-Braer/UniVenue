import { Listener, OrderCancelledEvent, Subjects, NotFoundError} from "@crescenttheaters/common";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/tickets";

export class OrderCancelledListener extends Listener<OrderCancelledEvent>{

    subject: Subjects.OrderCancelled = Subjects.OrderCancelled; 
    queueGroupName = queueGroupName;

    async onMessage(data: { id: string; version: number; ticket: { id: string; }; }, msg: Message) {
       
        const ticket = await Ticket.findById(data.ticket.id);

        if(!ticket){
            throw new NotFoundError();
        }

        ticket.set({
            orderId: undefined
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