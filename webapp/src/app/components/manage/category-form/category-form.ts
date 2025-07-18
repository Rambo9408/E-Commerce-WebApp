import { Component, ViewChild } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoryservice } from '../../../services/categoryservice';
import { Categoryinterface } from '../../../interfaces/categoryinterface';

@Component({
  selector: 'app-category-form',
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatButtonModule, MatMenuModule, MatInputModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css'
})
export class CategoryForm {
  @ViewChild(MatInput, { static: false }) matInput!: MatInput;

  catData: Omit<Categoryinterface, 'id'> = {
    name: ''
  };

  constructor(private category: Categoryservice, private router: Router, public route: ActivatedRoute) { }

  // ngOnInit() {
  //   let id = this.route.snapshot.params['id'];
  //   console.log("category id: ", id);
  //   if (id) {
  //     this.category.getCategoryById(id).subscribe((res) => {
  //       console.log(res.name);
  //       this.catData = {
  //         name: res.name
  //       }
  //     })
  //   }
  // }

  ngAfterViewInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.category.getCategoryById(id).subscribe((res) => {
        this.catData = { name: res.name };
        this.matInput.ngControl?.control?.updateValueAndValidity();

        // Trigger Material form control update
        // setTimeout(() => {
        //   if (this.matInput) {
        //   }
        // });
      });
    }
  }


  onSubmit(): void {
    const id = this.route.snapshot.params['id'];
    // if (this.catData) {
    //   this.category.addCategory(this.catData).subscribe((data: Categoryinterface) => {
    //     console.log('New Category:', data);
    //     form.resetForm();
    //     if (window.confirm('Category added successfully! Click OK to go to category list.')) {
    //       this.router.navigateByUrl('/admin/category');
    //     }
    //   });
    // }

    if (id) {
      this.category.updateCategory(id, this.catData).subscribe(() => {
        alert('Category updated successfully!');
        this.router.navigateByUrl('/admin/category');
      });
    } else {
      this.category.addCategory(this.catData).subscribe(() => {
        alert('Category added successfully!');
        this.router.navigateByUrl('/admin/category');
      });
    }
  }
}
