import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../post.model';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {

  loadedPosts: Post[] = [];
  title:string = "";
  content:string= "";
  num_post: number = 1;
  liked: boolean = false;

  user: string;
  private updateSubscription: Subscription;
  constructor(private http: HttpClient, private route: ActivatedRoute,public router:Router) { }


  ngOnInit() {
    this.user = this.route.snapshot.params['id'];
    // this.updateSubscription = interval(1000).subscribe(() => this.onLoadPost());
  }

  toDM() {
    this.router.navigate(['/homepage/' + this.user + '/DM/' + this.user])
  }

  toPost(){
    this.router.navigate(['/homepage/' + this.user + '/posts/' + this.user ])
  }

  // onCreatePost() {
  //   console.log(this.title + " : " + this.content);
  //   const postData: Post = {title: this.title, content: this.content, num_post: this.num_post, sender: this.user, reciever: "public", likes: 0};
  //   this.http
  //   .post<{name: string}>(
  //     'https://ng-complete-guild.firebaseio.com/posts.json',
  //     postData
  //   )
  //   .subscribe(responseData => {
  //     console.log(responseData);
  //   });
  //   this.num_post++;
  //   console.log(this.loadedPosts);
  // }

  // onLoadPost() {
  //   this.http.get<{[key: string]: Post}>('https://ng-complete-guild.firebaseio.com/posts.json')
  //   .pipe(
  //     map(responseData => {
  //       const postsArray: Post[] = [];
  //       var max_num_post: number = 0;
  //       for (const key in responseData) {
  //         if (responseData.hasOwnProperty(key)) {
  //           postsArray.push({...responseData[key],id: key })
  //           max_num_post = responseData[key].num_post > max_num_post ? responseData[key].num_post : max_num_post;
  //         }
  //       }
  //       this.num_post = max_num_post + 1;
  //       return postsArray;
  //     })).subscribe( posts => {
  //     this.loadedPosts = posts;
  //   });
  // }

  // onUpdate(index:number) {

  //   var tempPost: Post = this.loadedPosts[index];
  //   var id: string = tempPost.id;
  //   var old_like: number = tempPost.likes;
  //   console.log(this.loadedPosts);
  //   this.http.delete('https://ng-complete-guild.firebaseio.com/posts/'+ id +'.json').subscribe(()=>{
  //   });

  //   var likes = 0;
  //   if (this.liked == false) {
  //     likes = 1;
  //     this.liked = true;
  //   }
  //   else {
  //     likes = -1;
  //     this.liked = false;
  //   }

  //   console.log(tempPost.sender);
  //   const postData: Post = {title: tempPost.title, content: tempPost.content, num_post: tempPost.num_post, sender: tempPost.sender, reciever: "public", likes: old_like + likes};
  //   this.http
  //   .post<{name: string}>(
  //     'https://ng-complete-guild.firebaseio.com/posts.json',
  //     postData
  //   )
  //   .subscribe(responseData => {
  //   });
  //   this.num_post++;

    
  // }

  // onClearPosts() {
  //   // Send Http request
  //   this.http.delete('https://ng-complete-guild.firebaseio.com/posts.json').subscribe(()=>{
  //     this.loadedPosts = [];
  //   });
  // }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }
}
