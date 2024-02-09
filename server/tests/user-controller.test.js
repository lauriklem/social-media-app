const app = require('../app.js')
const request = require('supertest');

const url = '/users';
const user1 = { username: 'testuser1235', password: 'testpassword1235' };

afterAll(() => {
    app.close();
})

// Adding user
test('Adds user to db', async () => {
    const response = await request(app).post(url).send(user1);
    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
});

test('Try adding user that exists', async () => {
    const response = await request(app).post(url).send(user1);
    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
});

test('Try adding with empty body', async () => {
    const response = await request(app).post(url).send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
});


// Finding user
test('Finds user in db', async () => {
    const response = await request(app).get(url + '/testuser1235');
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
});

test('Tries to find user not in db', async () => {
    const response = await request(app).get(url + '/testuser9876');
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
});


// Updating user
test('Updating username', async () => {
    const response = await request(app).put(url).send({ oldUsername: 'testuser1235', newUsername: 'testuser6543' });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
});

test('Trying to update username not in db', async () => {
    const response = await request(app).put(url).send({ oldUsername: 'testuser9876', newUsername: 'testuser0000' });
    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
});

test('Trying to update username to empty username', async () => {
    const response = await request(app).put(url).send({ oldUsername: 'testuser6543', newUsername: '' });
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
});

test('Trying to update user without giving new information', async () => {
    const response = await request(app).put(url).send({ oldUsername: 'testuser6543' });
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
});

test('Updating password', async () => {
    const response = await request(app).put(url).send({ oldUsername: 'testuser6543', newPassword: 'testpassword9876' });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
});


// Deleting user