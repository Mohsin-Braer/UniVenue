import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest'
import mongoose from 'mongoose';
import { app } from '../app';
import { sign } from 'jsonwebtoken';

declare global {
    function signin(id?: string): string[];
}

jest.mock('../nats-wrapper');

// Set stripe key outside of beforeAll, key will be required asap once stripe.ts instantiated
process.env.STRIPE_KEY = '';

let mongo: any;
beforeAll(async () => {  //A hook that runs before any else is executed in the file
    process.env.JWT_KEY = 'admndfndfask';
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});


});

beforeEach(async () => { //before each of our tests, reach out to MongoMemoryServer mongo and reset all the data inside it
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections){
        await collection.deleteMany({});
    }

});

afterAll(async () => { //after all tests are completed, hook is called
    if (mongo) {
      await mongo.stop();
    }
    await mongoose.connection.close();
});


global.signin = (id?: string) => { //Constructing encoded JWT for testing purposes ONLY

    // Build JWT Payload { id, email }
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: "test@test.com"
    };

    // Create JWT
    const token = sign(payload, process.env.JWT_KEY!)

    // Build session obj {jwt:MY_JWT}
    const session = { jwt: token };

    // Turn session into JSON
    const sessionJSON = JSON.stringify(session);

    // Encode JSON and encode it as base64 
    const base64 = Buffer.from(sessionJSON).toString('base64');

    //return string cookie with encoded data 
    return [`session=${base64}`];

    
}