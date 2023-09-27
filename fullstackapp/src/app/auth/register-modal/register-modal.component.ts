import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit{
  @Output() close = new EventEmitter<void>();
  signupForm: FormGroup | any;

  constructor(private http: HttpClient) {}

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
    if(!this.signupForm.valid) {
      return;
    }
    return this.http.post('http://localhost:5000/api/v1/auth/register', {
        firstName:  this.signupForm.value.fName,
        lastName: this.signupForm.value.lName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        dateOfBirth: this.signupForm.value.date,
        gender: this.signupForm.value.gender
    }).subscribe(responseData => {
      console.log(responseData);
    })
  }

  onClose() {
    this.close.emit();
  }
}
