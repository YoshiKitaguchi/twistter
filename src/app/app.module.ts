import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { DirectMessageComponent } from './homepage/direct-message/direct-message.component';
import { PostsComponent } from './homepage/posts/posts.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'homepage/:id', component: HomepageComponent, children: [
    { path: 'posts/:id', component: PostsComponent},
    { path: 'DM/:id', component: DirectMessageComponent}
  ]},

];

@NgModule({
  declarations: [AppComponent, LoginComponent, SignUpComponent, HomepageComponent, DirectMessageComponent, PostsComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
