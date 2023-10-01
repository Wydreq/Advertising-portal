import {Component, OnInit} from '@angular/core';
import {AdminService} from "../admin-service";
import {Observable} from "rxjs";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: {
    success: boolean;
    count: number;
    data: any[]; // Use a more specific type if possible
  } = { success: false, count: 0, data: [] }; // Initialize with default values

  items: MenuItem[] | undefined;
  items2: MenuItem[] | undefined;
  selectedUser:any = null;

  constructor(private adminService: AdminService) {}

  chengeAccountStatus(user: any) {
    let adminObs: Observable<any>;
    if(user.status === 'active') {
       adminObs = this.adminService.updateUser('blocked', user._id);
      adminObs.subscribe(
        resData => {
          this.fetchUsers();
        },
        error => {

        }
      )
    } else {
      adminObs = this.adminService.updateUser('active', user._id);
      adminObs.subscribe(resData => {
        this.fetchUsers();
      });
    }
  }

  deleteUser(userId: string) {
    this.adminService.deleteUser(userId).subscribe(resData => {
      this.fetchUsers();
    });
  }

  fetchUsers() {
    let adminObs: Observable<any>;
    adminObs = this.adminService.onUsersFetch();
    adminObs.subscribe(
      resData => {
        this.users = resData;
        console.log(this.users);
      },
      error => {

      }
    )
  }

  handleEllipsisClick(menu: any, event: Event, user: any) {
    this.selectedUser = user
    menu.toggle(event);
  }

  ngOnInit() {
    this.fetchUsers();
    this.items = [
      {
        label: 'User options',
        items: [
          {
            label: 'Block user',
            icon: 'pi pi-lock',
            command: (event) => {
                this.chengeAccountStatus(this.selectedUser);
            }
          },
          {
            label: 'Delete user',
            icon: 'pi pi-times',
            command: () => {
              this.deleteUser(this.selectedUser._id);
            }
          }
        ]
      }
    ];
    this.items2 = [
      {
        label: 'User options',
        items: [
          {
            label: 'Unblock user',
            icon: 'pi pi-lock-open',
            command: () => {
              this.chengeAccountStatus(this.selectedUser);
            }
          },
          {
            label: 'Delete user',
            icon: 'pi pi-times',
            command: () => {
              this.deleteUser(this.selectedUser._id);
            }
          }
        ]
      }
    ];
  }
}

