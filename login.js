
var username;
var password;
var varify = false;
// function loginbtn_click( id) 
// {
//     console.log("clicked!!!");
//     username = 9;
//     password = 10;
//     console.log(username);
//     console.log(password);
//     window.location.href = "homepage.html";
// }

$(document).ready(function() {
    $("#loginbtn").click(function() {
        username = document.getElementById("emailUser").value;
        password = document.getElementById("password").value;
        console.log(username);
        console.log(password);
        window.location.assign('homepage.html');
    });
});

