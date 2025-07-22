import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Productservice } from '../../../services/productservice';
import { Productinterface } from '../../../interfaces/productinterface';
import { Employeeservice } from '../../../services/employeeservice';
import { Employeeinterface } from '../../../interfaces/employeeinterface';
import { ActivatedRoute } from '@angular/router';

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


  constructor(
    private prodService: Productservice,
    private empService: Employeeservice,
    public route: ActivatedRoute,
    private cd: ChangeDetectorRef,
  ) { }

  // ngOnInit(): void {
  //   this.empService.getEmployees().subscribe((employeeList: Employeeinterface[]) => {
  //     this.employee = employeeList;
  //     const currentEmployee = employeeList[0];

  //     this.role = currentEmployee?.role || 'employee';

  //     if (this.role === 'admin') {
  //       this.prodService.getProducts().subscribe((data: Productinterface[]) => {
  //         this.product = data;
  //       });
  //     }
  //   });
  // }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.empService.getCurrentEmployee().subscribe((user: Employeeinterface) => {
      this.role = user.role || 'employee';

      if (this.role === 'admin') {
        this.prodService.getProductById(id).subscribe((data) => {
          
          this.product = data;
          // this.product.offers = [
          //   'Get 10% off on your first order',
          //   'Free shipping on orders above ₹499',
          //   'Buy 1 Get 1 Free on select items',
          //   'Extra 5% discount with HDFC cards',
          //   'Flat ₹100 off on prepaid orders'
          // ];
          // this.product.offers = data.offerId?.map((offer: any) => offer.description);
          
          console.log(this.product.offerId);
          if (Array.isArray(data.images)) {
            this.imageList = data.images;
            if (this.imageList?.length > 0) {
              this.mainImage = this.imageBaseUrl + this.imageList[0];
            } // Only safe if array exists
          } else {
            this.imageList = [];
            this.mainImage = '';
          }
          this.cd.detectChanges();
        });
      }
    });
  }

  deleteImage(index: number) {
    this.imageList.splice(index, 1);// this will only remove image from the DOM not from the backend
  }

  handleImageUpload(event: any) {
    const files: FileList = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.uploadedImages.push(file);
    }

    // Preview (optional) - just for UI. Do not include in update call.
    console.log(this.uploadedImages);
  }

  addOffer() {
    this.product.offers = this.product.offers || [];
    this.product.offers.push('');
  }

  // updateProduct() {
  //   const offerDescriptions = this.product.offers.filter(o => o && o.trim() !== '');
  //   const productId = this.product._id;

  //   this.http.post(`/api/offers/update/${productId}`, {
  //     offers: offerDescriptions
  //   }).subscribe(response => {
  //     console.log('Offers updated!', response);
  //   });
  // }

}
