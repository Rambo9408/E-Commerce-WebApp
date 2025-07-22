import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Productservice } from '../../../services/productservice';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Productinterface } from '../../../interfaces/productinterface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductForm } from '../product-form/product-form';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    RouterLink
  ],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {

  displayedColumns: string[] = [
    'index',
    'name',
    'shortDescription',
    'price',
    'discount',
    'category',
    'brand',
    'image',
    'action'
  ];

  dataSource = new MatTableDataSource<Productinterface>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private productservice: Productservice) {
    this.loadProducts();
    this.dataSource = new MatTableDataSource<Productinterface>([])
  }

  toggleAddProductPopup(): void {
    const dialogRef = this.dialog.open(ProductForm, {
      width: '500px',
      height: '500px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.loadProducts();
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadProducts() {
    this.productservice.getProducts().subscribe((res) => {
      console.log(res);

      const updatedData = res.map(prod => ({
        ...prod,
        imageUrl: `http://localhost:3000${prod.images}`
      }));

      this.dataSource.data = updatedData;
    });
  }
  editProduct(row: any) {
    console.log(row._id);
    
    // const dialogRef = this.dialog.open(ProductForm, {
    //   width: '500px',
    //   disableClose: false,
    //   data: { id: row._id }  // send only ID
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 'refresh') {
    //     this.loadProducts();
    //   }
    // });
  }
  deleteProduct(row: any) {
    this.productservice.deleteProduct(row._id).subscribe((res)=>{
      if(res){
        alert("Product Deleted");
        this.loadProducts();
      }
    })
  }

}
