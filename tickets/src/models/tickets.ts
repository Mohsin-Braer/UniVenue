import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// Properties of submitted ticket to TicketModel
interface TicketAttrs {
    title: string;
    price: number;
    userId: string;
}

// Properties of TicketDoc
interface TicketDoc extends mongoose.Document{
    title: string;
    price: number;
    userId: string;
    version: number;
    orderId?: string;
}

// Properties of TicketModel
interface TicketModel extends mongoose.Model<TicketDoc>{
    build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema({
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
    order: {
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


