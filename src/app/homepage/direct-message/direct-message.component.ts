import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../post.model';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-direct-message',
  templateUrl: './direct-message.component.html',
  styleUrls: ['./direct-message.component.css']
})
export class DirectMessageComponent implements OnInit, OnDestroy {

  loadedPosts: Post[] = [];
  title:string = "";
  content:string= "";
  num_post: number = 1;

  user: string;
  receiver: string;
  private updateSubscription: Subscription;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }


  ngOnInit() {
    this.user = this.route.snapshot.params['id'];
    this.updateSubscription = interval(1000).subscribe(() => this.onLoadPost());
  }

  onCreatePost() {
    console.log(this.title + " : " + this.content);
    const postData: Post = {title: this.title, content: this.content, num_post: this.num_post, sender: this.user, reciever: this.receiver};
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
          if (responseData.hasOwnProperty(key) && responseData[key].reciever === this.user) {
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

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }
}
