const auth = require('../utils/authorization');

const username = "username1";
const token = auth.generateToken(username);
const req = {
    headers: {
        authorization: "Bearer " + token
    }
};

test('Checking username with correct username', () => {
    const result = auth.checkUsername(req, username);
    expect(result).toBe(true);
});

test('Checking username with wrong username', () => {
    const result = auth.checkUsername(req, "username2");
    expect(result).toBe(false);
});

test('Checking username with wrong username', () => {
    const result = auth.checkUsername(req, "Username1");
    expect(result).toBe(false);
});