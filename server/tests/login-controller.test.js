const app = require('../app.js')
const request = require('supertest');

const userUrl = '/users';
const loginUlr = '/login';
const user1 = { username: 'testuser1235', password: 'testpassword1235' };

afterAll(() => {
    app.close();
});

test('Adding user to db', async () => {
    const response = await request(app).post(userUrl).send(user1);
    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
});

test('Logging in with the added user', async () => {
    const response = await request(app).post(loginUlr).send(user1);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
});

test('Trying to log in with wrong password', async () => {
    const response = await request(app).post(loginUlr).send({ username: 'testuser1235', password: 'wrongpassword' });
    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
});

test('Trying to log in with wrong username', async () => {
    const response = await request(app).post(loginUlr).send({ username: 'testuser7777', password: 'wrongpassword' });
    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
});

test('Trying to log in with empty body', async () => {
    const response = await request(app).post(loginUlr).send({ username: "", password: "" });
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
});

test('Deleting added user', async () => {
    const response = await request(app).delete(userUrl + '/testuser1235');
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
});