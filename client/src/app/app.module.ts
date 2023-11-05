import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './shared/modal/modal.component';
import { RegisterModalComponent } from './auth/register-modal/register-modal.component';
import {
  HTTP_INTERCEPTORS,
  HttpClientJsonpModule,
  HttpClientModule,
} from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from './shared/alert/alert.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ForgotPasswordModalComponent } from './auth/forgot-password-modal/forgot-password-modal.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToastComponent } from './shared/toast/toast.component';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { NewOfferComponent } from './my-offers/new-offer/new-offer.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ImageModule } from 'primeng/image';
import { OfferDetailsComponent } from './my-offers/offer-details/offer-details.component';
import { EditOfferComponent } from './my-offers/edit-offer/edit-offer.component';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapComponent } from './shared/google-map/google-map.component';

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
    AdminUsersComponent,
    MyOffersComponent,
    NewOfferComponent,
    OfferDetailsComponent,
    EditOfferComponent,
    GoogleMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    MessagesModule,
    ToastModule,
    BrowserAnimationsModule,
    CardModule,
    TableModule,
    TagModule,
    MenuModule,
    InputSwitchModule,
    ImageModule,
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
