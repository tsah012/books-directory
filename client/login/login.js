async function login() {
    clearMessages();
    let data = {
        username: document.getElementById('username').value,
        password: String(document.getElementById('password').value)
    };

    let all_valid = true;

    if (!validateEmail(data.username)) {
        all_valid = false;
        document.getElementById('username-error-message').textContent = 'USER NAME MUST BE A VALID EMAIL';
    }

    if (!validatePassword(data.password)) {
        all_valid = false;
        document.getElementById('password-error-message').textContent = 'PASSWORD IS NOT VALID';
    }

    if (all_valid) {
        let url = 'api/user';
        try {
            let resp = await fetch(url, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)});
            let user = await resp.json();
            if (!user) {
                document.getElementById('message').textContent = 'USER NAME OR PASSWORD DOES NOT EXIST';
            }
            else{
                //Save in local storage
                localStorage['user'] = JSON.stringify(user);
                //Set cookie for future entries
                setCookie('Logged', user.mail, 1);
                //Load main page with books list
                window.location.href = '/';
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
    document.getElementById('username-error-message').textContent = '';
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