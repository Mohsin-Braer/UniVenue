import { Listener, Subjects, OrderCreatedEvent, OrderStatus } from "@crescenttheaters/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{

    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: { id: string; userId: string; status: OrderStatus; expiresAt: string; version: number; ticket: { id: string; price: number; }; }, msg: Message) {
        
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime(); //time remaining on timer in milliseconds

        // Created a job from the event we receive and then add it to the redis queue
        await expirationQueue.add({ //must add data obj that satisfies Payload interface from expiration-queue.ts
            orderId: data.id
        }, 
        { //Create a delay of processing job to act as 15 min timer
            delay,
        });

        msg.ack();

    }

};