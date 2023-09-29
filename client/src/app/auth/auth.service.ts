import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  token: string;
  options: {
    expires: string
  },
  user: {
    _id: string,
    email: string,
  }
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private tokenExpirationTimer: any;
  initialUser: User | null = null;
  user = new BehaviorSubject<User | null>(this.initialUser);

  constructor(private http: HttpClient, private router: Router) {}

  signup(firstName: string, lastName: string, email: string, password: string, dateOfBirth: Date, gender: string) {
    return this.http.post<AuthResponseData>('http://localhost:5000/api/v1/auth/register', {
      firstName:  firstName,
      lastName: lastName,
      email: email,
      password: password,
      dateOfBirth: dateOfBirth,
      gender: gender
    }).pipe(
      catchError(this.handleError),
      tap(resData => {

      })
    )
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('http://localhost:5000/api/v1/auth/login', {
      email: email,
      password: password
    }).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.router.navigate(['/home']);
        this.autoLogin();
        this.handleAuthentication(
          resData.user.email,
          resData.user._id,
          resData.token,
          resData.options.expires
        )
      })
    )
  }

  forgotPassword(email: string) {
    return this.http.post('http://localhost:5000/api/v1/auth/forgotpassword', {
      email: email,
    }).pipe(
      catchError(this.handleError),
      tap(resData => {

      })
    )
  }

  resetPassword(password: string, confirmPassword: string, token: string) {
    return this.http.post(`http://localhost:5000/api/v1/auth/resetpassword/${token}`, {
      password,
      confirmPassword
    }).pipe(
      catchError(this.handleError),
      tap(resData => {

      })
    )
  }


  autoLogin() {
    // @ts-ignore
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
      return;
    }
    this.handleAuthentication(
      userData.email,
      userData.id,
      userData._token,
      userData.expiresIn
    )
  }


  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: string
  ) {
    const user = new User(email, userId, token, expiresIn)
    this.user.next(user);
    localStorage.setItem('userData',JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'Invalid credentials!':
        errorMessage = 'Invalid credentials!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
