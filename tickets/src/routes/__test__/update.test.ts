import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

jest.mock('../../nats-wrapper');

it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'djhfsdffvdvf',
            price: 250
        })
        .expect(404)
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`api/tickets/${id}`)
        .send({
            title: 'djhfsdffvdvf',
            price: 250
        })
        .expect(401)
});

it('returns a 401 i the user does not own the ticket', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'fdjrjfvbv',
            price: 5
        }); 
        
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'testingticket',
            price: 26
        })
        .expect(401);
});

it('returns a 400 if the user provides an invalid titles or price', async () => {
    const cookie = global.signin();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'fdjrjfvbv',
            price: 5
        }); 
    
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 26
        })
        .expect(400);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'dcsdvsfv',
            price: -16
        })
        .expect(400);
        
});

it('Updates the ticket with valid inputs', async () => {
    const cookie = global.signin();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'Testing',
            price: 20
        }); 
    
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'Update',
            price: 40
        })
        .expect(200);

    const responseTicket = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send();

    expect(responseTicket.body.title).toEqual('Update');
    expect(responseTicket.body.price).toEqual(40);

});

it('publishes an event', async () => {
    const cookie = global.signin();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'Testing',
            price: 20
        }); 
    
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'Update',
            price: 40
        })
        .expect(200);
    
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});