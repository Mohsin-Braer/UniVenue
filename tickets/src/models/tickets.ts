import mongoose, { Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

import { EventCategory } from "@crescenttheaters/common";
import { LocationDoc } from "./location";



// Properties of submitted ticket to TicketModel
interface TicketAttrs {
    title: string;
    price: number;
    date: Date;
    category: EventCategory;
    location: LocationDoc;
    userId: string;
}

// Properties of TicketDoc
interface TicketDoc extends mongoose.Document{
    title: string;
    price: number;
    date: Date;
    category: EventCategory;
    location: LocationDoc;
    userId: string;
    version: number;
    orderId?: string; //indicates if a ticket is reserved
}

// Properties of TicketModel
interface TicketModel extends mongoose.Model<TicketDoc>{
    build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true    
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: Object.values(EventCategory),
        default: EventCategory.Other
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    orderId: {
        type: String,
        required: false
    }
}, {
    toJSON: {
      transform(doc, ret){
        ret.id = ret._id; 
        delete ret._id;
      }  
    }
});

ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };


