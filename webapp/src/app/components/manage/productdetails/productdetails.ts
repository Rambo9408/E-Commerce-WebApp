import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Productservice } from '../../../services/productservice';
import { Productinterface } from '../../../interfaces/productinterface';
import { Employeeservice } from '../../../services/employeeservice';
import { Employeeinterface } from '../../../interfaces/employeeinterface';
import { ActivatedRoute } from '@angular/router';
import { Brandservice } from '../../../services/brandservice';
import { Categoryservice } from '../../../services/categoryservice';
import { Categoryinterface } from '../../../interfaces/categoryinterface';
import { Brandinterface } from '../../../interfaces/brandinterface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-productdetails',
  imports: [FormsModule, CommonModule],
  templateUrl: './productdetails.html',
  styleUrl: './productdetails.css'
})
export class Productdetails {

  product !: Productinterface;
  employee!: Employeeinterface[];
  role!: string;
  selectedSize: string = '';
  selectedColor: string = '';
  imageList: string[] = [];
  uploadedImages: File[] = [];
  mainImage!: string;
  imageBaseUrl: string = 'http://localhost:3000/uploads/products/';
  newOffer: string = '';
  brandList!: Brandinterface[];
  selectedBrand!: Brandinterface;
  categoryList!: Categoryinterface[];
  selectedCategory!: Categoryinterface;
  // edited: boolean = true;


  constructor(
    private prodService: Productservice,
    private empService: Employeeservice,
    private category: Categoryservice,
    private brandservice: Brandservice,
    public route: ActivatedRoute,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const id = this.route.snapshot.params['id'];

    this.empService.getCurrentEmployee().subscribe((user: Employeeinterface) => {
      this.role = user.role || 'employee';

      if (this.role === 'admin') {
        // Load both product and dropdowns in parallel
        forkJoin({
          product: this.prodService.getProductById(id),
          brands: this.brandservice.getBrands(),
          categories: this.category.getCategories()
        }).subscribe(({ product, brands, categories }) => {
          this.product = product;
          this.brandList = brands;
          this.categoryList = categories;

          console.log("this.product.brandId: ", this.product.brandId._id);
          console.log("brandList: ", this.brandList);

          // Match and assign full objects
          this.product.brandId = this.brandList.find(
            (b) => b._id === this.product.brandId._id
          ) || this.product.brandId;


          this.product.categoryId = this.categoryList.find(
            (c) => c._id === this.product.categoryId._id
          ) || this.product.categoryId; // fallback to original if not found

          this.product.offerId = this.product.offerId.map(offer => ({
            ...offer,
            edited: false
          }));

          if (Array.isArray(product.images)) {
            this.imageList = product.images;
            this.mainImage = this.imageList.length > 0 ? this.imageBaseUrl + this.imageList[0] : '';
          } else {
            this.imageList = [];
            this.mainImage = '';
          }

          this.cd.detectChanges();
        });
      }
    });
  }


  loadDropdowns(): void {
    this.category.getCategories().subscribe(data => {
      this.categoryList = data;
    });

    this.brandservice.getBrands().subscribe(data => {
      this.brandList = data;
    });
  }


  deleteImage(index: number) {
    this.imageList.splice(index, 1);
  }

  handleImageUpload(event: any) {
    const files: FileList = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.uploadedImages.push(file);
    }

    console.log(this.uploadedImages);
  }

  addOffer() {
    const prodId = this.route.snapshot.params['id'];

    if (!this.product.offerId) {
      this.product.offerId = [];
    }

    const trimmedOffer = this.newOffer.trim();
    if (trimmedOffer) {
      const newOfferObj = { productId: prodId, description: trimmedOffer };

      this.product.offerId.push(newOfferObj);
      this.prodService.addOffer(prodId, newOfferObj).subscribe({
        next: (res) => {
          console.log('Offer added successfully', res);
          this.newOffer = '';
          this.loadProduct();
        },
        error: (err) => {
          console.error('Failed to add offer:', err);
        }
      });
    }
  }

  updateOffer(index: number) {
    const offer = this.product.offerId[index];
    const prodId = this.route.snapshot.params['id'];
    if (!offer || !offer.description || !offer._id) {
      console.warn('Invalid offer data:', offer);
      return;
    }

    const payload = {
      offerId: offer._id,
      description: offer.description
    };

    console.log(payload);

    this.prodService.updateOffer(prodId, payload).subscribe({
      next: (res) => {
        console.log('Offer updated successfully', res);
        offer.edited = false;
        this.loadProduct();
      },
      error: (err) => {
        console.error('Failed to update offer:', err);
      }
    });
  }

  deleteOffer(_id: string) {
    const payload = {
      productId: this.route.snapshot.params['id'],
    };

    this.prodService.deleteOffer(_id, payload).subscribe({
      next: (res) => {
        console.log('Offer deleted successfully', res);
        this.loadProduct();
      },
      error: (err) => {
        console.error('Failed to delete offer:', err);
      }
    });
  }


  updateProduct(formdta: NgForm) {
    const productId = this.route.snapshot.params['id'];
    this.prodService.updateProduct(productId, formdta.value).subscribe({
      next: (res) => {
        alert("Product Updated Successfully.")
        console.log('Product Updated successfully', res);
        this.loadProduct();
      },
      error: (err) => {
        console.error('Failed to Update Product:', err);
      }
    })
  }

}
