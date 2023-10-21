import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  onUsersFetch() {
    return this.http.get('http://localhost:5000/api/v1/admin/users');
  }

  updateUser(status: string, userId: string) {
    return this.http.put(`http://localhost:5000/api/v1/admin/users/${userId}`, {
      status: status,
    });
  }

  deleteUser(userId: string) {
    return this.http.delete(
      `http://localhost:5000/api/v1/admin/users/${userId}`
    );
  }
}
