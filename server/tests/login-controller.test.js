const app = require('../app.js')
const request = require('supertest');

const userUrl = '/users';
const loginUrl = '/login';
const user1 = { username: 'testuser1235', password: 'testpassword1235' };
let auth = '';

afterAll(() => {
    app.close();
});

test('Adding user to db', async () => {
    const response = await request(app).post(userUrl).send(user1);
    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
});

test('Logging in with the added user', async () => {
    const response = await request(app).post(loginUrl).send(user1);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token.length > 0).toBe(true);
    auth = "Bearer " + response.body.token;
});

test('Trying to log in with wrong password', async () => {
    const response = await request(app).post(loginUrl).send({ username: 'testuser1235', password: 'wrongpassword' });
    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
});

test('Trying to log in with wrong username', async () => {
    const response = await request(app).post(loginUrl).send({ username: 'testuser7777', password: 'wrongpassword' });
    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
});

test('Trying to log in with empty body', async () => {
    const response = await request(app).post(loginUrl).send({ username: "", password: "" });
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
});

test('Deleting added user', async () => {
    const response = await request(app).delete(`${userUrl}/${user1.username}`)
        .set({ Authorization: auth });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
});