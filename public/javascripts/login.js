$(document).ready(() => {
    
    var serverText = document.getElementById('serverURLButton');
    var server = serverText.value;

    var loginBtn = document.getElementById('loginBtn');
    var registerBtn = document.getElementById('registerBtn');
    
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

    // If user is already logged in, redirect to home page
    if (document.cookie.includes('token')) {
        window.location.replace(server);
    }

    // Fields
    var emailField = document.getElementById('emailField');
    var passField = document.getElementById('passField');
    var warning = document.getElementById('warning');
    var button = document.getElementById('submit');

    function login() {
        var postData = {
            email: emailField.value,
            password: passField.value
        };
        $.post(server + 'verifyLogin', postData, (data) => {
            if (data.success) {
                // Login verification passed, store token as cookie and redirect
                document.cookie = 'token=' + data.token;
                window.location.replace(server);
            } else {
                if (data.reason == 'noUser') {
                    alert('No user exists with that email, try again');
                    emailField.innerHTML = '';
                    passField.innerHTML = '';
                } else if (data.reason == 'wrongPass') {
                    alert('Incorrect password, try again');
                    passField.innerHTML = '';
                } else {
                    alert('Something went wrong, try again');
                }
            }
        });
    }

    function submit() {
        // Check all fields are valid, and submit
        var email = emailField.value;
        var pass = passField.value;

        // Override the checks if it's an admin
        if (email == 'sysadmin') {
            login();
        } else {
            if (email == '' || pass == '') {
                warning.style.display = 'block';
                warning.innerHTML = 'Please enter an email and a password';
            } else if (!email.includes('@')) {
                warning.style.display = 'block';
                warning.innerHTML = 'Please enter a valid email';
            } else {
                warning.style.display = 'none';
                login();
            }
        }
    }

    button.addEventListener('click', () => {
        submit();
    });    
    addEventListener('keydown', (event) => {
        if (event.key == 'Enter') {
            submit();
        }
    });
});