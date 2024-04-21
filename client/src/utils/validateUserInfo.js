// Check if password is valid
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

// Check if username is valid
export const validateUsername = (username) => {
    let length = "";
    let pattern = "";

    if (username.length < 4) {
        length = "Minimum length 4 characters\n";
    }
    if (!username.match(/^[a-z0-9]+$/gi)) {
        pattern = "Contains only letters and numbers\n";
    }

    return length + pattern;
}

// Check if username is not in use in the db
export const checkNameAvailable = async (username, serverUrl) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const result = await fetch(serverUrl + `users/${username}`, requestOptions);
        const response = await result.json();
        return !response.success;
    } catch (err) {
        console.log(err);
        console.log("Error while checking username availability");
        return false;
    }
}