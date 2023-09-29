import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ModalComponent } from './shared/modal/modal.component';
import { RegisterModalComponent } from './auth/register-modal/register-modal.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from './shared/alert/alert.component';
import { HomeComponent } from './home/home.component';
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import { ForgotPasswordModalComponent } from './auth/forgot-password-modal/forgot-password-modal.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToastComponent } from './shared/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    ModalComponent,
    RegisterModalComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    HomeComponent,
    ForgotPasswordModalComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi   : true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
