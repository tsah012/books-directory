(async function () {
    let url = window.location.origin + '/api/user';
    try {
        const res = await fetch(url);
        const user = await res.json();
        localStorage['user'] = JSON.stringify(user);
        ctrl.loadData();
    }
    catch (error) {
        console.log('error occurred during fetching user detalis. error:\n' + error.message);

    }
})()