import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {catchError, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit() {
    return this.http.get<{}>('http://localhost:5000/api/v1/auth/me').subscribe(resData => {
      console.log(resData);
    })
  }
}
