import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@crescenttheaters/common";
import { TicketOrder } from "../../models/tickets";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated

    queueGroupName = queueGroupName;

    async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
        const ticket = await TicketOrder.findByEvent(data);

        if(!ticket){
            throw new Error('Ticket not found');
        }

        ticket.set({
            title: data.title,
            price: data.price,
        });
        await ticket.save();

        msg.ack();
    }

}