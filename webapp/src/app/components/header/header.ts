import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-header',
  imports: [FormsModule, MatFormFieldModule, CommonModule, MatButtonModule, MatMenuModule, MatIconModule, MatInputModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  locations = ['Delhi', 'Mumbai', 'Bangalore'];
  selectedLocation = 'Delhi';
  searchQuery = '';
  showLoginPopup = false;

  loginEmail = '';
  loginPassword = '';

  toggleLoginPopup() {
    this.showLoginPopup = !this.showLoginPopup;
  }

  login() {
    console.log('Login clicked', this.loginEmail, this.loginPassword);
    // Add your authentication logic here
    this.toggleLoginPopup();
  }

  onSearch(): void {
    if (this.searchQuery?.trim()) {
      console.log('Searching for:', this.searchQuery);
      // Add actual search logic here (API call, filter, navigation, etc.)
    }
  }
}
