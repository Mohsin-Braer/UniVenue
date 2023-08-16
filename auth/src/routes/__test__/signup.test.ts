import request from "supertest";
import { app } from "../../app";

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'temp@temp.com',
            password: 'password'
        })
        .expect(201); //expect to receive a status code of 201 back
});

it('returns a 400 for an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'sfnovfsni',
            password: 'password',
        })
        .expect(400);
});

it('returns a 400 for an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'temp@temp.com',
            password: 'tv',
        })
        .expect(400);
});

it('returns a 400 if email and/or password fields left empty', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'temp@temp.com'
        })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'password'
        })
        .expect(400);
    
    await request(app)
        .post('/api/users/signup')
        .send({})
        .expect(400);
});

it('disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'temp@temp.com',
            password: 'password'
        })
        .expect(201); 

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'temp@temp.com',
            password: 'password'
        })
        .expect(400); 
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'temp@temp.com',
            password: 'password'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined(); //requires field 'secure' in CookieSession to be set to false (in order send cookies over non http requests)
});