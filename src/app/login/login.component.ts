import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  user1:string = "user1";
  user1_pass: string= "pass1";
  
  user2:string = "user2";
  user2_pass: string= "pass2";

  is_valid:boolean = true;

  tempLoginData = [];
  isFetching = false;
  constructor(private http: HttpClient, public router:Router) { }

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
    this.fetchPosts();
  }

  onSubmit(){

    this.fetchPosts();

    for (let element of this.tempLoginData) {
      console.log(this.username + " " + element.username);
      if(element.username == this.username && element.password == this.password) {
        this.is_valid = true;
        break;
      }
      else {
        this.is_valid = false;
        
      }
    }

    if(this.is_valid) {
      this.router.navigate(['/homepage/' + this.username])
    }
  }

}
