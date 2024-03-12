const app = require('../app.js')
const request = require('supertest');

const userUrl = '/users';
const loginUrl = '/login';
const user1 = { username: 'testuser1235', password: 'testpassword1235' };
const user2 = { username: 'testuser6543', password: 'testpassword9876' };
let auth = '';

afterAll(() => {
    app.close();
})

// Adding user
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

test('Trying to add user that exists', async () => {
    const response = await request(app).post(userUrl).send(user1);
    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
});

test('Trying to add with empty body', async () => {
    const response = await request(app).post(userUrl).send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
});


// Finding user
test('Finding user in db', async () => {
    const response = await request(app).get(userUrl + '/testuser1235');
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
});

test('Trying to find user not in db', async () => {
    const response = await request(app).get(userUrl + '/testuser9876');
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
});


// Updating user
test('Updating username', async () => {
    const response = await request(app).put(userUrl)
        .send({ oldUsername: user1.username, oldPassword: user1.password, newUsername: user2.username })
        .set({ Authorization: auth });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    auth = "Bearer " + response.body.token;
});

test('Trying to update username that doesnt match to token', async () => {
    const response = await request(app, { "Authorization": auth }).put(userUrl)
        .send({ oldUsername: user1.username, oldPassword: user1.password, newUsername: 'testuser0000' })
        .set({ Authorization: auth });
    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
});

test('Trying to update username to empty username', async () => {
    const response = await request(app, { "Authorization": auth }).put(userUrl)
        .send({ oldUsername: user2.username, oldPassword: user1.password, newUsername: '' })
        .set({ Authorization: auth });
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
});

test('Trying to update user without giving new information', async () => {
    const response = await request(app, { "Authorization": auth }).put(userUrl)
        .send({ oldUsername: 'testuser6543' })
        .set({ Authorization: auth });
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
});

test('Updating password', async () => {
    const response = await request(app, { "Authorization": auth }).put(userUrl)
        .send({ oldUsername: user2.username, oldPassword: user1.password, newPassword: user2.password })
        .set({ Authorization: auth });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
});

test('Trying to update with wrong password', async () => {
    const response = await request(app, { "Authorization": auth }).put(userUrl)
        .send({ oldUsername: user2.username, oldPassword: user1.password, newPassword: 'testpassword0000' })
        .set({ Authorization: auth });
    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
});


// Deleting user
test('Deleting user in db', async () => {
    const response = await request(app, { "Authorization": auth }).delete(userUrl + '/testuser6543')
        .set({ Authorization: auth });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
});

test('Tries to delete user not in db', async () => {
    const response = await request(app, { "Authorization": auth }).delete(userUrl + '/testuser6543')
        .set({ Authorization: auth });
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
});
