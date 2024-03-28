const app = require('../app.js')
const request = require('supertest');

const userUrl = '/users';
const loginUrl = '/login';
const postUrl = '/posts';
const user1 = { username: 'testuser1235', password: 'testpassword1235' };
let auth = '';
let postid = 0;

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

const post2 = {
    username: user1.username,
    contentArray: [
        {
            ctype: 'text',
            content: 'First content of second post'
        },
        {
            ctype: 'text',
            content: 'Second content of second post'
        }
    ]
};

beforeAll(async () => {
    // Add user and login with that user
    await request(app).post(userUrl).send(user1);
    const response = await request(app).post(loginUrl).send(user1);
    auth = "Bearer " + response.body.token;
});

afterAll(async () => {
    // Delete added user
    await request(app).delete(`${userUrl}/${user1.username}`)
        .set({ Authorization: auth });
    app.close();
});

// Add post
test('Adding post', async () => {
    const response = await request(app).post(postUrl).send(post1).set({ Authorization: auth });
    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
});

test('Adding another post', async () => {
    const response = await request(app).post(postUrl).send(post2).set({ Authorization: auth });
    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
});


test('Trying to add post with empty content array', async () => {
    const response = await request(app).post(postUrl).send({ username: user1.username, contentArray: [] }).set({ Authorization: auth });
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
});

test('Trying to add post with empty object inside array', async () => {
    const response = await request(app).post(postUrl).send({ username: user1.username, contentArray: [{}] }).set({ Authorization: auth });
    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
});

// Get posts
test('Getting all posts', async () => {
    const response = await request(app).get(postUrl).set({ Authorization: auth });
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length >= 2).toBe(true);
    postid = response.body.data[0].postid; // update postid
});

test('Getting post by id', async () => {
    const response = await request(app).get(postUrl + `/${postid}`).set({ Authorization: auth });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
});

test('Trying to get post by id that doesnt exist', async () => {
    const response = await request(app).get(postUrl + '/0').set({ Authorization: auth });
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
});

// Updating post
test('Updating content of post', async () => {
    const response = await request(app).put(postUrl)
        .send({
            postid: postid, 
            updatedArray: [{
                ctype: 'text',
                content: `First updated content of post ${postid}`
            },
            {
                ctype: 'text',
                content: `Second updated content of post ${postid}`
            }]
        })
        .set({ Authorization: auth });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
});

test('Adding more content to post', async () => {
    const response = await request(app).put(postUrl)
        .send({
            postid: postid, 
            newArray: [{
                ctype: 'text',
                content: `First added content of post ${postid}`
            },
            {
                ctype: 'text',
                content: `Second added content of post ${postid}`
            }]
        })
        .set({ Authorization: auth });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
});

test('Getting updated post', async () => {
    const response = await request(app).get(postUrl + `/${postid}`).set({ Authorization: auth });
    expect(response.statusCode).toBe(200);
    expect(response.body.data[0].contentArray[0].content).toMatch(/First updated/);
    expect(response.body.data[0].contentArray.length).toBe(4);
});

test('Trying to update post with no content', async () => {
    const response = await request(app).put(postUrl)
        .send({ postid: postid, updatedArray: [{}] })
        .set({ Authorization: auth });
    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
});

test('Trying to update post that doesnt exist', async () => {
    const response = await request(app).put(postUrl)
        .send({ postid: 0, updatedArray: post1.contentArray })
        .set({ Authorization: auth });
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
});

// Deleting post
test('Deleting post', async () => {
    const response = await request(app).delete(`${postUrl}/${postid}`).set({ Authorization: auth });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
});

test('Trying to delete post that doesnt exist', async () => {
    const response = await request(app).delete(`${postUrl}/${postid}`).set({ Authorization: auth });
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
});