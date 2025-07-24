import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Brandservice } from '../../../services/brandservice';
import { Brandinterface } from '../../../interfaces/brandinterface';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-brand-form',
  imports: [FormsModule, CommonModule, MatIcon],
  templateUrl: './brand-form.html',
  styleUrl: './brand-form.css'
})
export class BrandForm {
  brand: Omit<Brandinterface, 'id'> = {
    name: ''
  };

  file!: File;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<BrandForm>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private brandservice: Brandservice,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.data?.id) {
      this.brandservice.getBrandById(this.data.id).subscribe((brandData) => {
        this.brand = {
          name: brandData.name
        };
        this.cdr.detectChanges(); // Triggers change detection safely
        //Angular throws ExpressionChangedAfterItHasBeenCheckedError because it first renders the template with brand.name = '', 
        //then after the component is initialized, brand.name is updated from your API.
        //That breaks Angular's assumption that nothing should change after the first check.
      });
    }
  }


  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  submitForm() {
    const formData = new FormData();
    formData.append('name', this.brand.name);
    formData.append('uploadType', "brands");

    if (this.file) {
      formData.append('image', this.file);  // Only add if new file selected
    }

    // formData.forEach((value, key) => {
    //   console.log(key + ':', value);
    // });

    const url = this.data?._id
      ? `http://localhost:3000/brand/updatebrand/${this.data._id}`
      : 'http://localhost:3000/brand/addbrand';

    this.http.post(url, formData).subscribe({
      next: () => this.dialogRef.close('refresh'),
      error: (err) => console.error(err)
    });
  }
}
