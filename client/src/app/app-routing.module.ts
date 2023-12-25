import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { NewOfferComponent } from './my-offers/new-offer/new-offer.component';
import { OfferDetailsComponent } from './my-offers/offer-details/offer-details.component';
import { EditOfferComponent } from './my-offers/edit-offer/edit-offer.component';
import { SettingsComponent } from './settings/settings.component';
import { ResetEmailComponent } from './settings/reset-email/reset-email.component';
import { NegotiationsComponent } from './negotiations/negotiations.component';
import { NegotiationDetailsComponent } from './negotiations/negotiation-details/negotiation-details.component';
import { OfferNegotiationsComponent } from './my-offers/offer-negotiations/offer-negotiations.component';
import { PurchasedTransactionComponent } from './transactions/purchased-transaction/purchased-transaction.component';
import { SoldTransactionComponent } from './transactions/sold-transaction/sold-transaction.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth', pathMatch: 'full', component: AuthComponent },
  { path: 'auth/resetpassword/:token', component: ForgotPasswordComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'my-offers', canActivate: [AuthGuard], component: MyOffersComponent },
  {
    path: 'offers/:id',
    canActivate: [AuthGuard],
    component: OfferDetailsComponent,
  },
  {
    path: 'my-offers/new',
    canActivate: [AuthGuard],
    component: NewOfferComponent,
  },
  {
    path: 'my-offers/:offerId/negotiations',
    canActivate: [AuthGuard],
    component: OfferNegotiationsComponent,
  },
  {
    path: 'my-offers/edit/:id',
    canActivate: [AuthGuard],
    component: EditOfferComponent,
  },
  {
    path: 'transactions/purchased',
    canActivate: [AuthGuard],
    component: PurchasedTransactionComponent,
  },
  {
    path: 'transactions/sold',
    canActivate: [AuthGuard],
    component: SoldTransactionComponent,
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'users',
        canActivate: [AuthGuard, AdminGuard],
        component: AdminUsersComponent,
      },
    ],
  },
  { path: 'settings', canActivate: [AuthGuard], component: SettingsComponent },
  { path: 'reset-email/:token', component: ResetEmailComponent },
  { path: 'negotiations', component: NegotiationsComponent },
  { path: 'negotiations/:id', component: NegotiationDetailsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
