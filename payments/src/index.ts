import mongoose from 'mongoose';
import { natsWrapper } from './nats-wrapper';
import { app } from './app';

import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';



const start = async () => {

    console.log('Starting...');
    if(!process.env.JWT_KEY){   // TS will give an error if we don't check to see this value actually exists
        throw new Error("No key 'JWT_KEY' found");
    }

    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined');
    }

    if(!process.env.NATS_URL){
        throw new Error('NATS_URL must be defined');
    }

    if(!process.env.NATS_CLUSTER_ID){
        throw new Error('NATS_CLUSTER_ID must be defined');
    }

    if(!process.env.NATS_CLIENT_ID){
        throw new Error('NATS_CLIENT_ID must be defined');
    }

    try{
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);

        natsWrapper.client.on('close', () => {
            console.log("NATS connection closing");
            process.exit();
        });
        process.on('SIGINT', () => { natsWrapper.client.close()});
        process.on('SIGTERM', () => { natsWrapper.client.close()});

        new OrderCreatedListener(natsWrapper.client).listen();
        new OrderCancelledListener(natsWrapper.client).listen();

        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to the mongo db');
    } catch(err){
        console.log(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!!');
    });
};

start();
