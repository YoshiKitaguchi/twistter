import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  tempLoginData = [];
  isFetching = false;
  constructor(private http: HttpClient) { }

  onStoreData(loginData: {username: string; password: string}) {
    this.http.post('https://ng-complete-guild.firebaseio.com/posts.json',loginData).subscribe(responseData => {
      console.log(responseData);
    });
  }

  private fetchPosts() {
    this.http.get('https://ng-complete-guild.firebaseio.com/posts.json')
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
  }

}
