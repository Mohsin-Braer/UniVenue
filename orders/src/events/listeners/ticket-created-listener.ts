import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent } from "@crescenttheaters/common";
import { TicketOrder } from "../../models/tickets";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated

    queueGroupName = queueGroupName;

    async onMessage(data: TicketCreatedEvent['data'] , msg: Message) {
        const ticket = TicketOrder.build({
            id: data.id,
            title: data.title,
            price: data.price,
        });

        await ticket.save();

        msg.ack();

    }

}