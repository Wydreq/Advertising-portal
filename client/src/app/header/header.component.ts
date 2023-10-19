import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  firstName: string | undefined = '';
  lastName: string | undefined = '';
  role: string | undefined = '';
  private userSub: Subscription | undefined;
  items: MenuItem[] | undefined;
  menuChanged: boolean = true;

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.menuChanged = false;
      this.isAuthenticated = !!user;
      this.firstName = user?.firstName;
      this.lastName = user?.lastName;
      this.role = user?.role;
      this.items = [
        {
          label: this.isAuthenticated
            ? `${this.firstName} ${this.lastName}`
            : 'Profile',
          icon: 'pi pi-fw pi-user',
          visible: this.isAuthenticated,
          items: [
            {
              label: 'Admin panel',
              icon: 'pi pi-fw pi-star',
              visible: this.role === 'admin',
              items: [
                {
                  label: 'Manage users',
                  icon: 'pi pi-fw pi-users',
                  routerLink: '/admin/users',
                },
                {
                  label: 'Manage offers',
                  icon: 'pi pi-fw pi-shopping-cart',
                },
              ],
            },
            {
              label: 'Offers',
              icon: 'pi pi-fw pi-shopping-cart',
              items: [
                {
                  label: 'Add new offer',
                  icon: 'pi pi-fw pi-plus',
                  routerLink: '/my-offers/new',
                },
                {
                  label: 'Show my offers',
                  icon: 'pi pi-fw pi-eye',
                  routerLink: '/my-offers',
                },
              ],
            },
            {
              label: 'Settings',
              icon: 'pi pi-fw pi-cog',
            },
          ],
          styleClass: 'menucus',
        },
        {
          label: 'Logout',
          icon: 'pi pi-fw pi-power-off',
          command: () => {
            this.onLogout();
          },
          visible: this.isAuthenticated,
          styleClass: 'menucus',
        },
        {
          label: 'Sign in',
          icon: '',
          routerLink: '/auth',
          visible: !this.isAuthenticated,
          styleClass: 'menucus',
        },
      ];
      this.menuChanged = true;
      this.messageService.clear();
      this.messageService.add({
        key: 'toast3',
        severity: 'success',
        summary: 'Success',
        detail: this.isAuthenticated
          ? 'Successfully logged in!'
          : 'Successfully logged out!',
      });
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
