import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';

import { HomeComponent } from './auth/home/home.component';
import { NavigationComponent } from './auth/navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth/auth.guard';
import { AuthinterceptorService } from './auth/authinterceptor.service';
import { AddComponent } from './products/add/add.component';
@NgModule({
  declarations: [
    AppComponent,
    
    HomeComponent,
    NavigationComponent,
    LoginComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: "products", loadChildren:"../app/products/products/products.module#ProductsModule"},
      {path: "add", component:AddComponent },
      {path:"home", component:HomeComponent},
      {path:"login", component:LoginComponent},
      {path:"", redirectTo:"home", pathMatch:"full"},
      {path:" ** ", redirectTo:"home"},
    ])
  ],
  providers: [AuthService, CookieService, AuthGuard, {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthinterceptorService,
  multi:true
  } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
