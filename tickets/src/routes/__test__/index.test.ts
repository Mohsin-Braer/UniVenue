import request from "supertest";
import { app } from "../../app";


const createTicket = async (title: string, price: number, date: string, roomType: string, roomId: string, university: string, city: string, state: string, category: string, imgUrl: string) => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price,
            date,
            category,
            roomType,
            roomId, 
            university,
            city,
            state,
            imgUrl,
        })
        .expect(201);

} 

it('can fetch a list of tickets', async () => {
    
    await createTicket('State Fair', 20, '2023-07-20', 'Stokes Lawn', 'N/A', 'BC', 'Boston', 'MA', 'community', 'ajdbdfvk');
    await createTicket('Soccer game', 10, '2023-08-14', 'Alumni Stadium', 'S123', 'BC', 'Boston', 'MA', 'sports', 'ajdbdfvk');
    await createTicket('Play', 10, '2023-11-05', 'Agganis Arena', 'S123', 'BU', 'Boston', 'MA', 'community', 'ajdbdfvk');


    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200)
    
    expect(response.body.tickets.length).toBe(3);

    
});