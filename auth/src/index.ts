import mongoose from 'mongoose';

import { app } from './app';


const start = async () => {
    if(!process.env.JWT_KEY){   // TS will give an error if we don't check to see this value actually exists
        throw new Error("No key 'JWT_KEY' found");
    }

    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined');
    }

    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to the mongo db');
    } catch(err){
        console.log(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!!!');
    });
};

start();


