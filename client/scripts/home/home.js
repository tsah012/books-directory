async function logout() {
    // window.location = window.location.origin + '/logout';
    let url = window.location.origin + '/logout';
    try {
        let res = await fetch(url, {method: 'DELETE'});
        window.location.href = window.location.origin + '/login';
    }
    catch (error) {
        console.log('error occurred during logout. error:\n' + error);
    }
}