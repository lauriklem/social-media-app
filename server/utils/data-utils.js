const postsToArray = (fetchedPosts) => {
    const newArray = [];

    // Gather the contents of one post into an array
    let contentArray = [];
    let previousId = fetchedPosts[0].postid;
    for (let i = 0; i < fetchedPosts.length; i++) {
        const p = fetchedPosts[i];

        // Postid has changed
        if (previousId != p.postid) {
            prev = fetchedPosts[i - 1];
            newArray.push({
                postid: prev.postid,
                username: prev.username,
                created: prev.created,
                contentArray: contentArray
            });
            contentArray = [];
        }

        // Last element in the array
        if (i == fetchedPosts.length - 1) {
            if (previousId != p.postid) {
                newArray.push({
                    postid: p.postid,
                    username: p.username,
                    created: p.created,
                    contentArray: [{ ctype: p.ctype, content: p.content }]
                });
            } else {
                contentArray.push({ ctype: p.ctype, content: p.content });
                newArray.push({
                    postid: p.postid,
                    username: p.username,
                    created: p.created,
                    contentArray: contentArray
                });
            }
        } else { // Before last element
            contentArray.push({ ctype: p.ctype, content: p.content });
            previousId = p.postid;
        }
    };

    return newArray;
};

module.exports = {
    postsToArray: postsToArray,
}