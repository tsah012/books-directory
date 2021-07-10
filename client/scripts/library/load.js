(async function () {
    try {
        await ctrl.loadData();
    }
    catch (error) {
        console.log('error occurred during fetching library. error:\n' + error.message);

    }
})()