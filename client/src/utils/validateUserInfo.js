import { url as serverUrl } from 'connection';

export const validatePassword = (password) => {
        let length = "";
        let capital = "";
        let lower = "";
        let number = "";

        if (password.length < 8) {
            length = "Minimum length 8 characters\n";
        }
        if (!password.match(/[A-Z]/g)) {
            capital = "At least one uppercase letter\n";
        }
        if (!password.match(/[a-z]/g)) {
            lower = "At least one lowercase letter\n";
        }
        if (!password.match(/[0-9]/g)) {
            number = "At least one number\n";
        }

        return length + capital + lower + number;
};

export const validateUsername = (username) => {
    let length = "";
    let pattern = "";

    if (username.length < 4) {
        length = "Minimum length 4 characters\n";
    }
    if (!username.match(/[a-zA-Z0-9]+/g)) {
        pattern = "Contains only letters and numbers\n";
    }

    return length + pattern;
}

export const checkNameAvailable = async (username) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const result = await fetch(serverUrl + `users/${username}`, requestOptions);
        const response = await result.json();
        console.log(response);
        return !response.success;
    } catch (err) {
        console.log("Error while checking username availability");
        return false;
    }
}