import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../post.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  loadedPosts: Post[] = [];
  title:string = "";
  content:string= "";
  num_post: number = 1;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.onLoadPost();
  }

  onCreatePost() {
    console.log(this.title + " : " + this.content);
    const postData: Post = {title: this.title, content: this.content, num_post: this.num_post};
    this.loadedPosts.push(postData);
    this.http
    .post<{name: string}>(
      'https://ng-complete-guild.firebaseio.com/posts.json',
      postData
    )
    .subscribe(responseData => {
      console.log(responseData);
    });
    this.num_post++;
  }

  onLoadPost() {
    this.http.get<{[key: string]: Post}>('https://ng-complete-guild.firebaseio.com/posts.json')
    .pipe(
      map(responseData => {
        const postsArray: Post[] = [];
        var max_num_post: number = 0;
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({...responseData[key],id: key })
            max_num_post = responseData[key].num_post > max_num_post ? responseData[key].num_post : max_num_post;
          }
        }
        this.num_post = max_num_post + 1;
        return postsArray;
      })).subscribe( posts => {
      this.loadedPosts = posts;
    });
  }

  onClearPosts() {
    // Send Http request
    this.http.delete('https://ng-complete-guild.firebaseio.com/posts.json').subscribe(()=>{
      this.loadedPosts = [];
    });
  }
}
