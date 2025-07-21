import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from "@angular/material/select";
import { Categoryservice } from '../../../services/categoryservice';
import { Brandservice } from '../../../services/brandservice';
import { Categoryinterface } from '../../../interfaces/categoryinterface';
import { Brandinterface } from '../../../interfaces/brandinterface';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Productservice } from '../../../services/productservice';
import { Productinterface } from '../../../interfaces/productinterface';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductForm implements OnInit {
  submitProductForm() {
    throw new Error('Method not implemented.');
  }
  isEdit = false;
  productForm!: FormGroup;

  productData: Omit<Productinterface, "id"> = {
    name: '',
    shortDescription: '',
    description: '',
    price: 0,
    discount: 0,
    categoryId: '',
    brandId: '',
    images: [''],
  }
  selectedImages: File[] = [];
  categories!: Categoryinterface[];
  brands!: Brandinterface[];

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public dialogRef: MatDialogRef<ProductForm>,
    private category: Categoryservice,
    private brandservice: Brandservice,
    private cd: ChangeDetectorRef,
    private productservice: Productservice
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      shortDescription: [''],
      description: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      discount: ['', [Validators.min(0)]],
      images: [null], // for uploaded file handling
      categoryId: ['', Validators.required],
      brandId: ['', Validators.required]
    });

    // If fetching from backend:
    this.category.getCategories().subscribe(data => {
      this.categories = data;
      this.cd.detectChanges(); // tell Angular to check again
    });
    // this.brandservice.getBrands().subscribe(data => this.brands = data);
    this.brandservice.getBrands().subscribe(data => {
      this.brands = data;
      this.cd.detectChanges(); // tell Angular to check again
    });
  }

  onImageSelect(event: any): void {
    this.selectedImages = Array.from(event.target.files);
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      const productData = this.productForm.value;
      // this.productData = this.productForm.value;

      formData.append('name', productData.name);
      formData.append('shortDescription', productData.shortDescription);
      formData.append('description', productData.description);
      formData.append('price', productData.price.toString());
      formData.append('discount', (productData.discount || 0).toString());
      formData.append('categoryId', productData.categoryId);
      formData.append('brandId', productData.brandId);
      formData.append('uploadType', 'products');
      
      this.selectedImages.forEach((file) => {
        formData.append('images', file);
      });

      formData.forEach((value, key) => {
        console.log(key, value);
      });

      // this.productservice.addProduct(this.productData).subscribe(() => {
      //   this.dialogRef.close('refresh'); 
      // });
      this.productservice.addProduct(formData).subscribe(() => {
        this.dialogRef.close('refresh');
      });
    }
  }

  onCancel(): void {
    this.productForm.reset();
    this.selectedImages = [];
  }
}
