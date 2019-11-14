import { Component, OnInit } from '@angular/core';
// import $ from "jquery";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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

    // makes sure the email is good by comparing with the regex
    var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var email = (<HTMLInputElement>document.getElementById("email"));
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
    var password = (<HTMLInputElement>document.getElementById("password")); 
    var confirm_password = (<HTMLInputElement>document.getElementById("repeatPassword"));
    function confirmPassword(){
    if(password.value != confirm_password.value) {
      confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
      confirm_password.setCustomValidity('');
    }
    }
    password.onchange = confirmPassword;
    confirm_password.onkeyup = confirmPassword;

    // $(document).ready(function() {
    //   $("#signup").click(function() {
    //       window.location.assign('homepage.html');
    //   });
    // });

  }

}

