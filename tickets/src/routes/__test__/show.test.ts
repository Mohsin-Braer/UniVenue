import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it('returns 404 if ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .get(`/api/tickets/${id}`)
        .send()
        .expect(404);
});

it('returns the ticket if ticket is found', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'Concert',
            price: 50,
            date: '2023-07-15',
            roomType: 'Auditorium',
            roomId: 'S250', 
            university: 'Boston College',
            city: 'Boston',
            state: 'MA',
            category: 'study',
            imgUrl: 'fjnjndsjnsd'
        })
        .expect(201);
    
    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()
        .expect(200);
    
    expect(ticketResponse.body.title).toEqual('Concert'); 
    expect(ticketResponse.body.price).toEqual(50); 
});

