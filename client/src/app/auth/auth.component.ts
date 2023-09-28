import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
   isLogin: boolean = true;
   isLoading: boolean = false;
  errorMessage: string = '';

   constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    let authObs: Observable<{}>;
    this.isLoading = true;
    authObs = this.authService.login(
      form.value.email,
      form.value.password
    )
    authObs.subscribe(
      resData => {
        this.isLoading = false;
        this.errorMessage = '';
      },
      error => {
        this.isLoading = false;
        this.errorMessage = error;
      }
    )
  }
}
