import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Productservice } from '../../../services/productservice';
import { Productinterface } from '../../../interfaces/productinterface';
import { Employeeservice } from '../../../services/employeeservice';
import { Brandservice } from '../../../services/brandservice';
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
  mainImage!: string;
  imageBaseUrl: string = 'http://localhost:3000/uploads/products/';


  constructor(
    private prodService: Productservice,
    private empService: Employeeservice,
    public route: ActivatedRoute,
    private brandService: Brandservice,
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

    // this.product = {
    //   id: 1,
    //   name: 'Wayfarer Sunglasses',
    //   shortDescription: 'Stylish shades',
    //   description: 'Perfect for sunny days',
    //   price: 9529,
    //   discount: 10,
    //   categoryId: 'cat1',
    //   brandId: 'brand1',
    //   images: ['assets/img1.jpg', 'assets/img2.jpg']
    // };
  }
}
