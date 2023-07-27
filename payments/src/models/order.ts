import mongoose, { mongo } from "mongoose";
import { OrderStatus } from "@crescenttheaters/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface OrderAttrs{
    id: string;
    version: number;
    userId: string; 
    price: number;
    status: OrderStatus;
}

interface OrderDoc extends mongoose.Document{
    //id already included in mongoose.Document
    version: number;
    userId: string;
    price: number;
    status: OrderStatus;
}

interface OrderModel extends mongoose.Model<OrderDoc>{
    build(attrs: OrderAttrs): OrderDoc;
    findByEvent(event: {id: string; version: number;}): Promise<OrderDoc | null> //find order associated with passed in event plus version # - 1
}

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

OrderSchema.set('versionKey', 'version');
OrderSchema.plugin(updateIfCurrentPlugin);

OrderSchema.statics.build = (attrs: OrderAttrs) =>  {
    return new OrderPayment({
       _id: attrs.id,
       version: attrs.version,
       price: attrs.price, 
       userId: attrs.userId,
       status: attrs.status
    });
}

OrderSchema.statics.findByEvent = async (event: {id: string; version: number;}) => {
    return OrderPayment.findOne({
        _id: event.id,
        version: event.version - 1
    });
};

const OrderPayment = mongoose.model<OrderDoc, OrderModel>('OrderPayment', OrderSchema);

export { OrderPayment };