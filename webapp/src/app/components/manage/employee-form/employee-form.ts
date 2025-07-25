import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Employeeinterface } from '../../../interfaces/employeeinterface';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})

export class EmployeeForm {
  isEditing:boolean = false;
  
  employee: Omit<Employeeinterface, 'id'> = {
    name: '',
    email: '',
    contact: '',
    password: '',
    department: '',
    dateOfJoining: '',
    task: []
  };

  constructor(private http: HttpClient, public route: ActivatedRoute, public dialogRef: MatDialogRef<EmployeeForm>, @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data) {
      this.isEditing =true;
      this.employee = {
        name: data.name || '',
        email: data.email || '',
        contact: data.contact || '',
        password: '',
        role: data.role || '',
        department: data.department || '',
        dateOfJoining: data.dateOfJoining ? new Date(data.dateOfJoining) : '',
        task: data.task || []
      };
    }
   }

  submitEmployee() {
    console.log('Submitted Employee:', this.employee);

    const url = this.data?._id
      ? `http://localhost:3000/user/updateEmployee/${this.data._id}`
      : 'http://localhost:3000/user/addEmployee';

    this.http.post(url, this.employee).subscribe({
      next: () => this.dialogRef.close('refresh'),
      error: (err) => console.error(err)
    });
  }
}
