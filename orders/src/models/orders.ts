import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { OrderStatus } from '@crescenttheaters/common';
import { TicketDoc } from "./tickets";

export { OrderStatus } //centralize all order related properties to order model file


interface OrderAttrs {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    ticket: TicketDoc;
    
};

interface OrderDoc extends mongoose.Document {
    userId: string;
    status: OrderStatus;
    expiresAt: Date; 
    version: number;  
    ticket: TicketDoc;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}


const ordersSchema = new mongoose.Schema(
{
   userId: {
        type: String,
        required: true
   },
   status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Created
   },
   expiresAt: {
        type: mongoose.Schema.Types.Date, 
        required: true
   },
   ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TicketOrder'
   }

}, {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id; 
        }
    }
}); 

ordersSchema.set('versionKey', 'version');
ordersSchema.plugin(updateIfCurrentPlugin);

ordersSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', ordersSchema);

export { Order };



