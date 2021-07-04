(async function () {

    let url = window.location.origin + '/api/user';
    try {
        let res = await fetch(url);
        let user = await res.json();
        document.getElementById('greet').textContent = 'Hello ' + user.name;
    }
    catch (error) {
        console.log('error occurred during fetching user detalis. error:\n' + error.message);
    }

}())