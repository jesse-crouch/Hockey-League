function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

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

    var welcomeMsg = document.getElementById('welcomeMsg');
    var typeMsg = document.getElementById('typeMsg');

    // If user is logged in, display info otherwise redirect to login
    if (document.cookie.includes('token')) {
        var postData = {
            token: getCookie('token'),
            required_level: 1
        };

        // Verify token
        $.post(server + 'verifyToken', postData, (data) => {
            console.log(data);
            if (data.success) {

                var user = data.data.info;
                if (user.email == 'sysadmin') {
                    welcomeMsg.innerHTML = 'System Administrator';
                } else {
                    welcomeMsg.innerHTML = 'Welcome ' + user.first_name + '!';
                }
                typeMsg.innerHTML = data.data.table + ' Control Panel';

            } else {
                alert('Something went wrong, try again');
            }
        });

    } else {
        window.location.replace(server + 'login');
    }

});