import { Publisher, OrderCancelledEvent, Subjects } from "@crescenttheaters/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    
    readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled; 
}