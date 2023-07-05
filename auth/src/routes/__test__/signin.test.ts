import request from "supertest";
import { app } from "../../app";

it('returns a cookie on successful sign in', async () => {
    await request(app)
        .post('api/users/signup')
        .send({
            email: 'temp@temp.com',
            password: 'password'
        })
        .expect(201); 

    const response =  await request(app)
        .post('api/users/signin')
        .send({
            email: 'temp@temp.com',
            password: 'password'
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});

it('returns a 400 when email supplied does not exist', async () => {
    return request(app)
        .post('api/users/signin')
        .send({
            email: 'temp@temp.com',
            password: 'password'
        })
        .expect(400); 
});

it('returns a 400 when password supplied does not exist', async () => {
    await request(app)
        .post('api/users/signup')
        .send({
            email: 'temp@temp.com',
            password: 'password'
        })
        .expect(201); 

    await request(app)
        .post('api/users/signin')
        .send({
            email: 'temp@temp.com',
            password: 'pass123'
        })
        .expect(400); 

});