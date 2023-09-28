import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthResponseData, AuthService} from "../auth.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit{
  @Output() close = new EventEmitter<void>();
  signupForm: FormGroup | any;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      'fName': new FormControl(null, Validators.required),
      'lName': new FormControl(null,Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'date': new FormControl(null, Validators.required),
      'gender': new FormControl('male', Validators.required)
    });
    this.signupForm.get('date').setValidators(this.forbiddenAge);
  }

  forbiddenAge(control: FormControl): {[s: string]: any} | null {
    const birthDate = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    if (control.value === null) {
      return {'ageIsForbidden': true};
    }
    const birthMonth = birthDate.getMonth();
    const todayMonth = today.getMonth();
    const birthDay = birthDate.getDate();
    const todayDay = today.getDate();

    if (todayMonth < birthMonth || (todayMonth === birthMonth && todayDay < birthDay)) {
      age--;
    }

    if (age < 13) {
      return {'ageIsForbidden': true};
    }

    return null;
  }

  onSubmit() {
    let authObs: Observable<{}>;
    this.isLoading = true;
    if(!this.signupForm.valid) {
      this.isLoading = false;
      return;
    }

    authObs = this.authService.signup(
      this.signupForm.value.fName,
      this.signupForm.value.lName,
      this.signupForm.value.email,
      this.signupForm.value.password,
      this.signupForm.value.date,
      this.signupForm.value.gender
    );

    authObs.subscribe(
      resData => {
        this.isLoading = false;
        this.errorMessage = '';
        this.close.emit();
      },
      error => {
        this.isLoading = false;
        this.errorMessage = error;
      }
    )
  }

  onClose() {
    this.close.emit();
  }
}
