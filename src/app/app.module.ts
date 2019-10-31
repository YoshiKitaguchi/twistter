import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ContentService } from './shared/services/content.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
 { path: 'homepage', component: HomepageComponent },
 { path: 'signup', component: SignUpComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    SignUpComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
  ],
  providers: [/*ContentService*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
