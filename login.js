
var username;
var password;
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
        //console.log(username);
        password = document.getElementById("password").value;
        window.location.assign('homepage.html');
    });
});
