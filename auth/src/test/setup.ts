import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest'
import mongoose from 'mongoose';
import { app } from '../app';

declare global {
    function signin(): Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {  //A hook that runs before any else is executed in the file
    process.env.JWT_KEY = 'admndfndfask';
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});


});

beforeEach(async () => { //before each of our tests, reach out to MongoMemoryServer mongo and reset all the data inside it
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


global.signin = async () => {
    const email = 'temp@temp.com';
    const password = 'password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email, password
        })
        .expect(201);

    const cookie = response.get('Set-Cookie');

    return cookie;
}