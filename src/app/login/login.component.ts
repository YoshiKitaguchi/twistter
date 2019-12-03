import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
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

  onStoreData(loginData: {username: string; password: string}) {
    this.http.post('https://twister-user-data.firebaseio.com/posts.json',loginData).subscribe(responseData => {
      console.log(responseData);
    });
  }

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
    // console.log(this.username);
    // console.log(this.password);

    var data = {
      username: this.username,
      password: this.password
    }

    this.fetchPosts();
    this.onStoreData(data);

    if (this.username == this.user1 && this.password == this.user1_pass) {
      this.is_valid = true;
      this.router.navigate(['/homepage/user1'])
    }
    else if (this.username == this.user2 && this.password == this.user2_pass) {
      this.is_valid = true;
      this.router.navigate(['/homepage/user2'])
    }
    else {
      this.is_valid = false;
      this.router.navigate(['/'])
    }
    // console.log(this.userInfo);
  }

}
