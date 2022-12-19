import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { UserAddComponent } from './user-add/user-add.component';
import { HomeComponent } from './home/home.component';
import { NgToastModule } from 'ng-angular-popup';
import { LoggingInterceptor } from './logging.interceptor';
import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';
import { ReviewsAddComponent } from './reviews-add/reviews-add.component';
import { NgxMaterialRatingModule } from 'ngx-material-rating';
import { RatingComponent } from './user-rating/user-rating.component';
@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    HeaderComponent,
    UserAddComponent,
    HomeComponent,
    LoginComponent,
    UserHomeComponent,
    ReviewsListComponent,
    ReviewsAddComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMatIntlTelInputComponent,
    NgToastModule,
    NgxMaterialRatingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoggingInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
