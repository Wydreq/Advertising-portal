import {Component, OnInit} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit() {
      this.http.get<{}>('http://localhost:5000/api/v1/auth/me').subscribe(resData => {
      // console.log(resData);
    });
  }
}
