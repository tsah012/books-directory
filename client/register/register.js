async function register() {
    clearMessages();
    let data = {
        name: document.getElementById('name').value,
        mail: document.getElementById('mail').value,
        password: String(document.getElementById('password').value)
    };

    let all_valid = true;

    if (!validateEmail(data.mail)) {
        all_valid = false;
        document.getElementById('mail-error-message').textContent = 'EMAIL IS NOT VALID';
    }

    if (!validatePassword(data.password)) {
        all_valid = false;
        document.getElementById('password-error-message').textContent = 'PASSWORD IS NOT VALID';
    }

    if (all_valid) {
        try {
                //Send request for adding new user
                let url = '/api/user/add';
                let resp = await fetch(url, {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)});
                let success = await resp.json();

            // if user already exists, show error message
            if (!success) {
                document.getElementById('message').textContent = 'USER WITH SAME EMAIL ALREADY EXISTS';
            }
            else{
                //Load login page in case registration was successful
                window.location.href = '/login';
            }
        }
        catch (error) {
            console.log('error occurred during register. error:\n' + error);
        }
    }
}

function validateName(name) {
    return name.trim().length;
}

function validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.trim().length;
}

function clearMessages() {
    document.getElementById('name-error-message').textContent = '';
    document.getElementById('mail-error-message').textContent = '';
    document.getElementById('password-error-message').textContent = '';
    document.getElementById('message').textContent = '';

}
