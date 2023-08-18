import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { sign } from 'jsonwebtoken';

declare global {
    function signin(): string[];
}

jest.mock('../nats-wrapper');

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


global.signin = () => { //Constructing encoded JWT for testing purposes ONLY

    // Build JWT Payload { id, email }
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
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