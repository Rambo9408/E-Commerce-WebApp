import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<Login>) { }

  onLogin() {
    console.log('Login with', this.email, this.password);
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:3000/auth/login', loginData).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        // You can store the token in localStorage or a service
        localStorage.setItem('token', response.token);
        localStorage.setItem('isAdmin', response.user.isAdmin);
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Login failed', err);
        alert(err.error?.message || 'Login failed. Try again.');
      }
    })
    this.dialogRef.close();
  }

  onSocialLogin(platform: string) {
    console.log(`Login with ${platform}`);
  }
}
