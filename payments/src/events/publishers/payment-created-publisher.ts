import { Publisher, Subjects, PaymentCreatedEvent } from "@crescenttheaters/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}