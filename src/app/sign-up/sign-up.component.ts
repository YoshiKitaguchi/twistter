import { Router } from '@angular/router';
import { Component, OnInit, ɵɵNgOnChangesFeature } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Directive } from '@angular/core';

// import $ from "jquery";

// declare module "jquery" {
//   export = $;
// }
import * as $ from "jquery";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  username: string = "";
  password1: string = "";
  password2: string = "";
  tempLoginData = [];
  constructor(private http: HttpClient,public router:Router) { }

  private fetchPosts() {
    this.http.get('https://twister-user-data.firebaseio.com/posts.json')
    .pipe(map(responseData =>{
      for (const key in responseData) {
        this.tempLoginData.push({...responseData[key], id: key});
      }
    }))
    .subscribe(posts => {
      console.log(posts);
    });
  }


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

    this.fetchPosts();
  }

  passMatch: boolean = true;

  onSubmit(){
      // console.log("username: "  + this.username);
      // console.log("password1: " + this.password1);
      // console.log("password2:" + this.password2);

      console.log(this.tempLoginData);
      if (this.password1 != this.password2 || this.username.length < 3 || this.password1.length < 6) {
        this.passMatch = false;
      }
      else {
        this.passMatch= true;
        var is_exit:boolean = false;
        for (let element of this.tempLoginData) {
          if(element.username === this.username) {
            is_exit = true;
          }
        }
        if(!is_exit) {
          var loginData = {
            username: this.username,
            password: this.password1
          }
          this.http.post('https://twister-user-data.firebaseio.com/posts.json',loginData).subscribe(responseData => {
            console.log(responseData);
          });
          this.router.navigate([''])
        }
      }
  }

}

