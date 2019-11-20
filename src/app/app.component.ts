import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.isFetching = true;
    // this.PostsService.fetchPosts().subscribe( posts => {
    //   this.isFetching = false;
    //   this.loadedPosts = posts;
    // });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // this.http
    //   .post<{name: string}>(
    //     'https://ng-complete-guild.firebaseio.com/posts.json',
    //     postData
    //   )
    //   .subscribe(responseData => {
    //     console.log(responseData);
    //   });
    //this.PostsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    // this.isFetching = true;
    // this.PostsService.fetchPosts().subscribe( posts => {
    //   this.isFetching = false;
    //   this.loadedPosts = posts;
    // });
  }

  onClearPosts() {
    // Send Http request
    // this.PostsService.deletePost().subscribe(()=>{
    //   this.loadedPosts = [];
    // });
  }

  private fetchPosts() {
    // this.isFetching = true;
    // this.http.get<{[key: string]: Post}>('https://ng-complete-guild.firebaseio.com/posts.json').pipe(
    //   map(responseData => {
    //   const postsArray: Post[] = [];
    //   for (const key in responseData) {
    //     if (responseData.hasOwnProperty(key)) {
    //       postsArray.push({...responseData[key],id: key })
    //     }
    //   }
    //   return postsArray;
    // }))
    // .subscribe(posts =>{
    //   console.log(posts)
    //   this.isFetching = false;
    //   this.loadedPosts = posts;
    // });
  }

}
