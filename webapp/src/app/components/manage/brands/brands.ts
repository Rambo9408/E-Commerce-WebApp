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
import { Brandinterface } from '../../../interfaces/brandinterface';
import { Brandservice } from '../../../services/brandservice';

@Component({
  selector: 'app-brands',
  standalone: true,  // Assuming standalone component usage
  imports: [CommonModule, MatButtonModule, MatTableModule, MatIcon, MatFormFieldModule, MatInputModule, MatPaginator, MatSort],
  templateUrl: './brands.html',
  styleUrls: ['./brands.css']
})
export class Brands implements AfterViewInit {
  displayedColumns: string[] = ['index', 'name', 'image', 'action'];
  dataSource = new MatTableDataSource<Brandinterface>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private dialog: MatDialog, private brandservice: Brandservice) {
    this.loadBrands();
    this.dataSource = new MatTableDataSource<Brandinterface>([]);
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
    // this.http.get<any[]>('http://localhost:3000/brand/allbrands').subscribe((data) => {
    this.brandservice.getBrands().subscribe((data) => {
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

  editBrand(row: Brandinterface) {
    // this.http.get<Brandinterface>(`http://localhost:3000/brand/getbrand/${row._id}`).subscribe((brandData) => {
    //   const dialogRef = this.dialog.open(BrandForm, {
    //     width: '500px',
    //     disableClose: false,
    //     data: brandData 
    //   });

    //   dialogRef.afterClosed().subscribe(result => {
    //     if (result === 'refresh') {
    //       this.loadBrands();
    //     }
    //   });
    // });

    const dialogRef = this.dialog.open(BrandForm, {
      width: '500px',
      disableClose: false,
      data: { id: row._id }  // send only ID
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.loadBrands();
      }
    });
  }


  deleteBrand(row: Brandinterface) {
    this.http.delete(`http://localhost:3000/brand/deleteBrand/${row._id}`).subscribe(() => {
      this.loadBrands();
    });
  }

}
