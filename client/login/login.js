function validateForm() {
    let data = {
        username: document.getElementById('username').value,
        password: String(document.getElementById('password').value)
    };

    let all_valid = true;

    if (!validateEmail(data.username)) {
        all_valid=false;
        document.getElementById('username-error-message').textContent = 'USER NAME MUST BE A VALID EMAIL';
    }

    if (!validatePassword(data.password)){
        all_valid = false;
        document.getElementById('password-error-message').textContent = 'PASSWORD IS NOT VALID';
    }

    return all_valid;
}

function validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePassword(password){
    return password.trim().length;
}