// updates the dropdown menus
$(function(){
    $("#monthDropdown").on('click', 'li a', function(){
        $(".btn1:first-child").text($(this).text());
        $(".btn1:first-child").val($(this).text());
    });
});
$(function(){
    $("#dayDropdown").on('click', 'li a', function(){
        $(".btn2:first-child").text($(this).text());
        $(".btn2:first-child").val($(this).text());
    });
});
$(function(){
    $("#yearDropdown").on('click', 'li a', function(){
        $(".btn3:first-child").text($(this).text());
        $(".btn3:first-child").val($(this).text());
    });
});

$(document).ready(function() {
    $("#signup").click(function() {
        window.location.assign('homepage.html');
    });
});


// makes sure the email is good by comparing with the regex
var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var email = document.getElementById("email");
function confirmEmail(){
    if (email.value.match(emailFormat)){
        console.log("it's ok");
        email.setCustomValidity('');
    } else {
        email.setCustomValidity("Please enter a real email address");
    }
}
email.onchange = confirmEmail;

// confirms the password entered is the same
var password = document.getElementById("password"); 
var confirm_password = document.getElementById("repeatPassword");
function confirmPassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}
password.onchange = confirmPassword;
confirm_password.onkeyup = confirmPassword;