import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import { Subscription } from 'rxjs';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnInit, OnDestroy {

  isAuthenticated = false;
  firstName: string | undefined  = '';
  lastName: string | undefined = '';
  private userSub: Subscription | undefined;
  items: MenuItem[] | undefined;
  menuChanged:boolean = true;

  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.menuChanged = false;
      this.isAuthenticated = !!user;
      this.items = [
        {
          label: `Profile`,
          icon: 'pi pi-fw pi-user',
          visible: this.isAuthenticated,
          items: [
            {
              label: 'Settings',
              icon: 'pi pi-fw pi-cog',
            }
          ],
          styleClass: 'menucus'
        },
        {
          label: 'Logout',
          icon: 'pi pi-fw pi-power-off',
          command: () => {this.onLogout()},
          visible: this.isAuthenticated,
          styleClass: 'menucus'
        },
        {
          label: "Sign in",
          icon: '',
          routerLink: '/auth',
          visible: !this.isAuthenticated,
          styleClass: 'menucus'
        }
      ];
      this.menuChanged = true;
      this.firstName = user?.firstName;
      this.lastName = user?.lastName
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
