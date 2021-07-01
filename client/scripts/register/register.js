async function register() {
    clearMessages();
    let data = {
        name: document.getElementById('name').value.trim(),
        mail: document.getElementById('mail').value.trim(),
        password: String(document.getElementById('password').value).trim()
    };

    let all_valid = true;

    if (!validateName(data.name)) {
        all_valid = false;
        document.getElementById('name-error-message').textContent = 'NAME IS NOT VALID';
    }

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
                let url = window.location.origin + '/api/user/add';
                let resp = await fetch(url, {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)});
                let resData = await resp.json();

            // if user already exists, show error message
            if (!resData.status) {
                document.getElementById('message').textContent = resData.message;
            }
            else{
                //Load login page in case registration was successful
                window.location.href = window.location.origin + '/login';
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
