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
});