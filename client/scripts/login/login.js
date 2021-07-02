async function login() {
    clearMessages();
    let data = {
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
        let url = window.location.origin + '/login';
        try {
            let resp = await fetch(url, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)});
            let resData = await resp.json();
            if (!resData.success) {
                document.getElementById('message').textContent = resData.message;
            }
            else{
                //Load main page with books list
                window.location.href = window.location.origin;
            }
        }
        catch (error) {
            console.log('error occurred during login. error:\n' + error);
        }
    }
}

function validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.trim().length;
}

function clearMessages() {
    document.getElementById('mail-error-message').textContent = '';
    document.getElementById('password-error-message').textContent = '';
    document.getElementById('message').textContent = '';

}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}