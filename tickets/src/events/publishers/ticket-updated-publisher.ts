import { Publisher, Subjects, TicketUpdatedEvent } from "@crescenttheaters/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    
    readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated; 
}