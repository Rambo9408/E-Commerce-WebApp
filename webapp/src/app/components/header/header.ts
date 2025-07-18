import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Login } from '../login/login'; // 👈 Adjust the path as needed

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  locations = ['Delhi', 'Mumbai', 'Bangalore'];
  selectedLocation = 'Delhi';
  searchQuery = '';

  constructor(private dialog: MatDialog) {}

  toggleLoginPopup(): void {
    this.dialog.open(Login, {
      width: '500px',
      disableClose: false
    });
  }

  onSearch(): void {
    if (this.searchQuery?.trim()) {
      console.log('Searching for:', this.searchQuery);
      // Add search API or navigation logic here
    }
  }
}
