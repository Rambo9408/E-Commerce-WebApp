import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Employeeinterface } from '../../../interfaces/employeeinterface';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-employees',
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatIcon,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    DatePipe,
  ],
  templateUrl: './employees.html',
  styleUrl: './employees.css'
})
export class Employees {

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'doj',
    'contact',
    'department',
    'tasks',
    'action'
  ];

  dataSource !: MatTableDataSource<Employeeinterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {
    this.loadEmployees();
    this.dataSource = new MatTableDataSource<Employeeinterface>([]);
  }

  loadEmployees(): void {
    this.http.get<Employeeinterface[]>('http://localhost:3000/user/Employees').subscribe((data) => {
      console.log(data);
      
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editEmployee(row: any) {

  }
  deleteEmployee(row: any) {

  }
}
