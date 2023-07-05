import { Publisher, Subjects, TicketCreatedEvent } from "@crescenttheaters/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated; 
}

