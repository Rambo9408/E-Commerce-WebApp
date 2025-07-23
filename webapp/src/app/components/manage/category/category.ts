import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Categoryservice } from '../../../services/categoryservice';
import { Categoryinterface } from '../../../interfaces/categoryinterface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RouterLink,
  ],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category {

  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<Categoryinterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // CategoryService = inject(Categoryservice);// we have to inject the category service for calling apis

  constructor(private category: Categoryservice) {
    this.getCatefories();
    this.dataSource = new MatTableDataSource<Categoryinterface>([]);
  }

  getCatefories() {
    this.category.getCategories().subscribe((data: Categoryinterface[]) => {
      console.log('Fresh employee list:', data);
      this.dataSource.data = data;
    })
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

  deleteCategory(row: any) {
    const confirmDelete = confirm(`Are you sure you want to delete "${row.name}"?`);
    console.log(row.name);
    if (confirmDelete) {
      this.category.deleteCategory(row._id).subscribe(() => {
        // alert('Category deleted successfully!');
        this.getCatefories(); // Refresh list
      });
    }
  }

}
