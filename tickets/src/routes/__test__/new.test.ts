import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/tickets";
import { natsWrapper } from "../../nats-wrapper";


it('has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({})

    expect(response.status).not.toBe(404);
});

it('can only be accessed if the user is signed in', async () => {
    await request(app)
        .post('/api/tickets')
        .send({})
        .expect(401);
        
});

it('returns a status other than 401 if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({});

    expect(response.statusCode).not.toBe(401);
        
});

it('returns an error if an invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets') 
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10,
            date: '2023-07-15',
            roomType: 'classroom',
            roomId: 'S250', 
            university: 'Boston College',
            city: 'Boston',
            state: 'MA',
            category: 'study',
            imgUrl: 'fjnjndsjnsd'
        })
        .expect(400);

    await request(app)
        .post('/api/tickets') 
        .set('Cookie', global.signin())
        .send({
            price: 10,
            date: '2023-07-15',
            roomType: 'classroom',
            roomId: 'S250', 
            university: 'Boston College',
            city: 'Boston',
            state: 'MA',
            category: 'study',
            imgUrl: 'fjnjndsjnsd'
        })
        .expect(400);
});

it('returns an error if an invalid prices is provided', async () => {
    await request(app)
        .post('/api/tickets') 
        .set('Cookie', global.signin())
        .send({
            title: 'Boston Celtics RND 1 GM 1',
            price: -10,
            date: '2023-07-15',
            roomType: 'classroom',
            roomId: 'S250', 
            university: 'Boston College',
            city: 'Boston',
            state: 'MA',
            category: 'study',
            imgUrl: 'fjnjndsjnsd'
        })
        .expect(400);

    await request(app)
        .post('/api/tickets') 
        .set('Cookie', global.signin())
        .send({
            title: 'JAY-Z - TD Garden',
            date: '2023-07-15',
            roomType: 'classroom',
            roomId: 'S250', 
            university: 'Boston College',
            city: 'Boston',
            state: 'MA',
            category: 'study',
            imgUrl: 'fjnjndsjnsd'
        })
        .expect(400);
});

it('creates a ticket with valid input', async () => {

    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0); // db should be cleared before each test

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'FC Barcelona v. Real Madrid - October 29th, 2023',
            price: 128.54,
            date: '2023-07-15',
            roomType: 'classroom',
            roomId: 'S250', 
            university: 'Boston College',
            city: 'Boston',
            state: 'MA',
            category: 'study',
            imgUrl: 'fjnjndsjnsd'
        })
        .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual('FC Barcelona v. Real Madrid - October 29th, 2023') 
    expect(tickets[0].price).toEqual(128.54);

});

it('publishes an event', async () => {
    const title = 'testing';

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'FC Barcelona v. Real Madrid - October 29th, 2023',
            price: 128.54,
            date: '2023-07-15',
            roomType: 'classroom',
            roomId: 'S250', 
            university: 'Boston College',
            city: 'Boston',
            state: 'MA',
            category: 'study',
            imgUrl: 'fjnjndsjnsd'
        })
        .expect(201);
    
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});