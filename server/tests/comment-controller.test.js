const app = require('../app.js')
const request = require('supertest');

const userUrl = '/users';
const loginUrl = '/login';
const postUrl = '/posts';
const user1 = { username: 'testuser1235', password: 'testpassword1235' };
let auth = '';
let postid = 0;
let commentUrl = "";

const post1 = {
    username: user1.username,
    contentArray: [
        {
            ctype: 'text',
            content: 'First content'
        },
        {
            ctype: 'text',
            content: 'Second content'
        }
    ]
};

const comment1 = {
    username: user1.username,
    content: "First comment",
    ctype: "Text",
};

beforeAll(async () => {
    // Add user and login with that user
    await request(app).post(userUrl).send(user1);
    const response_user = await request(app).post(loginUrl).send(user1);
    auth = "Bearer " + response_user.body.token;

    // Add post
    await request(app).post(postUrl).send(post1).set({ Authorization: auth });

    // Get postid of latest post
    const response_post = await request(app).get(postUrl).set({ Authorization: auth });
    postid = response_post.body.data[0].postid;

    commentUrl = `/posts/${postid}/comments`;
});

afterAll(async () => {
    // Delete added user
    await request(app).delete(`${userUrl}/${user1.username}`)
        .set({ Authorization: auth });
    app.close();
});

test('Getting comments of a post without comments', async () => {
    const response = await request(app).get(commentUrl).set({ Authorization: auth });
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
});

test('Adding comment', async () => {
    const response = await request(app).post(commentUrl).send(comment1).set({ Authorization: auth });
    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
});

test('Getting comments of a post', async () => {
    const response = await request(app).get(commentUrl).set({ Authorization: auth });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
});

test('Adding another comment', async () => {
    const response = await request(app).post(commentUrl).send(comment1).set({ Authorization: auth });
    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
});

test('Getting comments of a post', async () => {
    const response = await request(app).get(commentUrl).set({ Authorization: auth });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBe(2);
});

test('Getting comments of a post that doesnt exist', async () => {
    const response = await request(app).get('/posts/0/comments').set({ Authorization: auth });
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
});

test('Adding comment without username', async () => {
    const response = await request(app).post(commentUrl).send({ content: "Content", ctype: "Text" }).set({ Authorization: auth });
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
});