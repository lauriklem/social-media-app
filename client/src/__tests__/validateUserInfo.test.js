import { validatePassword, validateUsername } from 'utils/validateUserInfo';

// Validate password
test('Validate password with valid string', () => {
    const str = validatePassword('Test1234');
    expect(str).toBe('');
});

test('Validate password without numbers', () => {
    const str = validatePassword('Testaaaa');
    expect(str.length > 0).toBe(true);
});

test('Validate password without uppercase letter', () => {
    const str = validatePassword('test1234');
    expect(str.length > 0).toBe(true);
});

test('Validate password without lowercase letter', () => {
    const str = validatePassword('TEST1234');
    expect(str.length > 0).toBe(true);
});

test('Validate password with too short string', () => {
    const str = validatePassword('Test123');
    expect(str.length > 0).toBe(true);
});

test('Validate password with empty string', () => {
    const str = validatePassword('');
    expect(str.length > 0).toBe(true);
});


// Validate username
test('Validate username with valid string', () => {
    const str = validateUsername('Test1234');
    expect(str).toBe('');
});

test('Validate username with too short string', () => {
    const str = validateUsername('Tes');
    expect(str.length > 0).toBe(true);
});

test('Validate username with empty string', () => {
    const str = validateUsername('');
    expect(str.length > 0).toBe(true);
});

test('Validate username with symbol other than letter or number', () => {
    const str = validateUsername('Test123!');
    expect(str.length > 0).toBe(true);
});
