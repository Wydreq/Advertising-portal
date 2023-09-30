import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {catchError, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, private messageService: MessageService, private authService: AuthService, private zone: NgZone) {}

  ngOnInit() {
      this.http.get<{}>('http://localhost:5000/api/v1/auth/me').subscribe(resData => {
      // console.log(resData);
    });
    this.authService.loginSuccess$.subscribe(() => {
        this.show();
    });
  }

show() {
    this.messageService.clear();
    this.messageService.add({key: "toast3", severity: 'success', summary: 'Success', detail: 'Successfully logged!' });
  }
}
