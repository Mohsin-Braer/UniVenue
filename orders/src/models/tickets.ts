import mongoose, { mongo } from "mongoose";
import { Order, OrderStatus } from "./orders";


interface TicketAttrs{
    title: string;
    price: number;
};

export interface TicketDoc extends mongoose.Document{
    title: string;
    price: number;
    isReserved(): Promise<boolean>;
};

interface TicketModel extends mongoose.Model<TicketDoc>{
    build(attrs: TicketAttrs): TicketDoc;
};

const ticketOrderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
        min: 0
    }
}, {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

ticketOrderSchema.statics.build = (attrs: TicketAttrs) => {
    return new TicketOrder(attrs);
};

ticketOrderSchema.methods.isReserved = async function() { //need to use keyword function so this keyword (refers to the current ticketDoc that isReserved() is being called within) works as intended
    const existingOrder = await Order.findOne({
        ticket: this,
        status: {
            $in: [ //$in mongoose command looks for orders with status types within array provided
                OrderStatus.Created,
                OrderStatus.AwaitingPayment,
                OrderStatus.Complete
            ],
        },
    });

    return !!existingOrder; //convert existingOrder to boolean representation
};

const TicketOrder = mongoose.model<TicketDoc, TicketModel>('TicketOrder', ticketOrderSchema);

export { TicketOrder };