import { Publisher, Subjects, ExpirationCompleteEvent } from "@crescenttheaters/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}