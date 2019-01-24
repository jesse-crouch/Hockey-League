$(document).ready(() => {

    var serverText = document.getElementById('serverURLButton');
    var server = serverText.value;

    var loginBtn = document.getElementById('loginBtn');
    var registerBtn = document.getElementById('registerBtn');
    var submit = document.getElementById('submit');
    var typeSelect = document.getElementById('typeSelect');
    
    if (document.cookie.includes('token')) {
        console.log(getCookie('token'));
        
        loginBtn.className = 'btn btn-info';
        loginBtn.value = 'My Account';
        registerBtn.className = 'btn btn-danger';
        registerBtn.value = 'Logout';

        loginBtn.addEventListener('click', () => {
            window.location.replace(server + 'account');
        });
        registerBtn.addEventListener('click', () => {
            window.location.replace(server + 'logout');
        });
    } else {
        loginBtn.addEventListener('click', () => {
            window.location.replace(server + 'login');
        });
        registerBtn.addEventListener('click', () => {
            window.location.replace(server + 'register');
        });
    }

    typeSelect.addEventListener('change', () => {
        var choice = typeSelect.options[typeSelect.selectedIndex].value.toLowerCase();
        if (choice != 'choose a type') {
            submit.style.visibility = 'visible';
        } else {
            submit.style.visibility = 'hidden';
        }
    });

    submit.addEventListener('click', () => {
        var choice = typeSelect.options[typeSelect.selectedIndex].value.toLowerCase();
        window.location.replace(server + 'register/' + choice);
    });
});