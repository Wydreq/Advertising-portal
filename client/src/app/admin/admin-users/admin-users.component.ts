import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Observable } from 'rxjs';
import { MenuItem, Message } from 'primeng/api';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  users: {
    success: boolean;
    count: number;
    data: any[];
  } = { success: false, count: 0, data: [] };

  items: MenuItem[] | undefined;
  items2: MenuItem[] | undefined;
  selectedUser: any = null;
  messages: Message[] = [];

  constructor(
    private adminService: AdminService,
    private messagesService: MessagesService
  ) {}

  ngOnInit() {
    this.messagesService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
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
            },
          },
          {
            label: 'Delete user',
            icon: 'pi pi-times',
            command: () => {
              this.deleteUser(this.selectedUser._id);
            },
          },
        ],
      },
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
            },
          },
          {
            label: 'Delete user',
            icon: 'pi pi-times',
            command: () => {
              this.deleteUser(this.selectedUser._id);
            },
          },
        ],
      },
    ];
  }

  chengeAccountStatus(user: any) {
    let adminObs: Observable<any>;
    if (user.status === 'active') {
      adminObs = this.adminService.updateUser('blocked', user._id);
      adminObs.subscribe(
        (resData) => {
          this.messagesService.setMessage(
            'success',
            'Success',
            'Status has been changed!'
          );
          this.fetchUsers();
        },
        (error) => {
          this.messagesService.setMessage(
            'error',
            'Error',
            'Something went wrong!'
          );
        }
      );
    } else {
      adminObs = this.adminService.updateUser('active', user._id);
      adminObs.subscribe(
        (resData) => {
          this.messagesService.setMessage(
            'success',
            'Success',
            'Status has been changed!'
          );
          this.fetchUsers();
        },
        (error) => {
          this.messagesService.setMessage('error', 'Error', error);
        }
      );
    }
  }

  deleteUser(userId: string) {
    this.adminService.deleteUser(userId).subscribe(
      (resData) => {
        this.messagesService.setMessage(
          'success',
          'Success',
          'Account has been deleted!'
        );
        this.fetchUsers();
      },
      (err) => {
        this.messagesService.setMessage('error', 'Error', err);
      }
    );
  }

  fetchUsers() {
    let adminObs: Observable<any>;
    adminObs = this.adminService.onUsersFetch();
    adminObs.subscribe(
      (resData) => {
        this.users = resData;
        console.log(this.users);
      },
      (error) => {
        this.messagesService.setMessage('error', 'Error', error);
      }
    );
  }

  handleEllipsisClick(menu: any, event: Event, user: any) {
    this.selectedUser = user;
    menu.toggle(event);
  }
}
