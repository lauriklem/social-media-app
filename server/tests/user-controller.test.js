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
    expect(response.body.success).toBe(true);
});

test('Try adding user that exists', async () => {
    const response = await request(app).post(url).send(user1);
    expect(response.body.success).toBe(false);
});

test('Try adding with empty body', async () => {
    const response = await request(app).post(url).send({});
    expect(response.body.success).toBe(false);
});


// Finding user
test('Finds user in db', async () => {
    const response = await request(app).get(url + '/testuser1235');
    console.log(response.body)
    expect(response.body.success).toBe(true);
});

test('Tries to find user not in db', async () => {
    const response = await request(app).get(url + '/testuser9876');
    console.log(response.body)
    expect(response.body.success).toBe(false);
});
