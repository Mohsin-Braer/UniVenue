import request from "supertest";
import { app } from "../../app";

const createTicket = (title: string, price: number) => {
    request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price,
        });
} 

it('can fetch a list of tickets', async () => {
    await createTicket('State Fair', 20);
    await createTicket('Soccer game', 10);
    await createTicket('Play', 10);

    const response = await request(app)
        .get('api/tickets')
        .send()
        .expect(200)
    
    expect(response.body.length).toBe(3);
});