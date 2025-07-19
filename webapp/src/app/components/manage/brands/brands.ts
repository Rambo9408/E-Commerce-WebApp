import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { BrandForm } from '../brand-form/brand-form';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-brands',
  standalone: true,  // Assuming standalone component usage
  imports: [CommonModule, MatButtonModule, MatTableModule, MatIcon, MatFormFieldModule, MatInputModule, MatPaginator, MatSort],
  templateUrl: './brands.html',
  styleUrls: ['./brands.css']
})
export class Brands implements AfterViewInit {
  displayedColumns: string[] = ['index', 'name', 'image', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.loadBrands();
  }

  toggleAddBrandPopup(): void {
    const dialogRef = this.dialog.open(BrandForm, {
      width: '500px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.loadBrands();
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadBrands(): void {
    this.http.get<any[]>('http://localhost:3000/brand/allbrands').subscribe((data) => {
      const updatedData = data.map(brand => ({
        ...brand,
        imageUrl: `http://localhost:3000${brand.image}`
      }));

      this.dataSource.data = updatedData;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editBrand(row: any) {
    this.http.get<any>(`http://localhost:3000/brand/getbrand/${row._id}`).subscribe((brandData) => {
      const dialogRef = this.dialog.open(BrandForm, {
        width: '500px',
        disableClose: false,
        data: brandData   // pass the brand data to the dialog
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'refresh') {
          this.loadBrands();
        }
      });
    });
  }


  deleteBrand(row: any) {
    // Confirm and delete
    this.http.delete(`http://localhost:3000/brand/deleteBrand/${row._id}`).subscribe(() => {
      this.loadBrands();
    });
  }

}
