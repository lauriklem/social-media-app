const dataUtils = require('../utils/data-utils');

const fetchedPosts = [
    {
        postid: 10,
        username: "user",
        created: "created",
        content: "First content of post 10",
        ctype: "Text"
    },
    {
        postid: 10,
        username: "user",
        created: "created",
        content: "Second content of post 10",
        ctype: "Text"
    },
    {
        postid: 10,
        username: "user",
        created: "created",
        content: "Third content of post 10",
        ctype: "Text"
    }
];

test('postsToArray with 1 post that has 3 contents', () => {
    const result = dataUtils.postsToArray(fetchedPosts);
    expect(result.length).toBe(1);
    expect(result[0].contentArray.length).toBe(3);
});

test('postsToArray with 2 posts', () => {
    fetchedPosts.push({
        postid: 9,
        username: "user2",
        created: "created",
        content: "First content of post 9",
        ctype: "Text"
    });
    const result = dataUtils.postsToArray(fetchedPosts);
    expect(result.length).toBe(2);
    expect(result[0].contentArray.length).toBe(3);
    expect(result[1].contentArray.length).toBe(1);
});

test('postsToArray with 2 posts', () => {
    fetchedPosts.push({
        postid: 9,
        username: "user2",
        created: "created",
        content: "Second content of post 9",
        ctype: "Text"
    });
    const result = dataUtils.postsToArray(fetchedPosts);
    expect(result[1].contentArray.length).toBe(2);
    expect(result[1].contentArray[0].content === "First content of post 9");
    expect(result[1].contentArray[1].content === "Second content of post 9");
});