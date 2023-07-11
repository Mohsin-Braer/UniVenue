import mongoose, { mongo } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { Order, OrderStatus } from "./orders";


interface TicketAttrs{
    id: string;
    title: string;
    price: number;
};

export interface TicketDoc extends mongoose.Document{
    title: string;
    price: number;
    version: number;
    isReserved(): Promise<boolean>;
};

interface TicketModel extends mongoose.Model<TicketDoc>{
    build(attrs: TicketAttrs): TicketDoc;
    findByEvent(event: {id: string, version: number}): Promise<TicketDoc | null> //find ticket associated with passed in event plus version # - 1
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

ticketOrderSchema.set('versionKey', 'version');
ticketOrderSchema.plugin(updateIfCurrentPlugin);

ticketOrderSchema.statics.build = (attrs: TicketAttrs) => {
    return new TicketOrder({
        _id: attrs.id,
        title: attrs.title,
        price: attrs.price,
    });
};

ticketOrderSchema.statics.findByEvent = async (event: {id: string, version: number}) => {
    return TicketOrder.findOne({
        id: event.id,
        version: event.version - 1
    });
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