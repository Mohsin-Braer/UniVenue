import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent, EventCategory } from "@crescenttheaters/common";
import { TicketOrder } from "../../models/tickets";
import { LocationOrder, LocationDoc } from "../../models/location";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated

    queueGroupName = queueGroupName;

    async onMessage(data: { id: string; title: string; price: number; version: number; userId: string; date: string; category: EventCategory; location: { roomType: string; roomId: string; university: string; city: string; state: string; imgUrl: string; }; }, msg: Message) {
    
        var location: LocationDoc | null = await LocationOrder.findOne({
            roomId: data.location.roomId,
            university: data.location.university,
            city: data.location.city,
            state: data.location.state,   
        });
        
        if(location === null){

            location = LocationOrder.build({
                roomType: data.location.roomType,
                roomId: data.location.roomId,
                university: data.location.university,
                city: data.location.city,
                state: data.location.state,
                imgUrl: data.location.imgUrl, 
            });
            await location.save();
        
        }

        const ticket = TicketOrder.build({
            id: data.id,
            title: data.title,
            price: data.price,
            date: new Date(data.date),
            category: data.category,
            location: location,
        });
        await ticket.save(); 
        

        msg.ack();
    }

    // async onMessage(data: TicketCreatedEvent['data'] , msg: Message) {
        
    //     var location: LocationDoc | null = await LocationOrder.findOne({
    //         roomId: data.location.roomId,
    //         university: data.location.university,
    //         city: data.location.city,
    //         state: data.location.state,   
    //     });
        
    //     if(!location){
    //         location = LocationOrder.build({
    //             roomType: data.location.roomType,
    //             roomId: data.location.roomId,
    //             university: data.location.university,
    //             city: data.location.city,
    //             state: data.location.state,
    //             imgUrl: data.location.imgUrl, 
    //         });
    //         await location.save();
    //     }

    //     const ticket = TicketOrder.build({
    //         id: data.id,
    //         title: data.title,
    //         price: data.price,
    //         date: new Date(data.date),
    //         category: data.category,
    //         location,
    //     });

    //     await ticket.save();

    //     msg.ack();

    // }

}