async function login() {
    clearMessages();
    let data = {
        name: document.getElementById('name').value,
        password: String(document.getElementById('password').value)
    };

    let all_valid = true;

    if (!validateField(data.name)) {
        all_valid = false;
        document.getElementById('name-error-message').textContent = 'NAME IS NOT VALID';
    }

    if (!validateField(data.password)) {
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
                document.getElementById('message').textContent = 'NAME OR PASSWORD IS INCORRECT';
            }
            else{
                //Save in local storage
                localStorage['user'] = JSON.stringify(user);
                //Set cookie for future entries
                setCookie('Logged', user.mail, 30);
                //Load main page with books list
                window.location.href = '/';
            }
        }
        catch (error) {
            console.log('error occurred during login. error:\n' + error);
        }
    }
}

function validateField(password) {
    return password.trim().length;
}

function clearMessages() {
    document.getElementById('name-error-message').textContent = '';
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