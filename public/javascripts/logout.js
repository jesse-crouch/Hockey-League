$(document).ready(() => {

    var serverText = document.getElementById('serverURLButton');
    var server = serverText.value;

    if (document.cookie.includes('token')) {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.replace(server);
    } else {
        window.location.replace(server);
    }

});