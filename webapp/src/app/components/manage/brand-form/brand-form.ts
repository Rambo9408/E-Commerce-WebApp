import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-brand-form',
  imports: [FormsModule, CommonModule, MatIcon],
  templateUrl: './brand-form.html',
  styleUrl: './brand-form.css'
})
export class BrandForm {
  brand = { name: '' };
  file!: File;

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<BrandForm>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data) {
      this.brand.name = this.data.name;
      // Don't prefill file input (browsers don't allow setting file input programmatically)
    }
  }


  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  submitForm() {
    const formData = new FormData();
    formData.append('name', this.brand.name);
    if (this.file) {
      formData.append('image', this.file);  // Only add if new file selected
    }
    const url = this.data?._id
      ? `http://localhost:3000/brand/updatebrand/${this.data._id}`
      : 'http://localhost:3000/brand/addbrand';

    this.http.post(url, formData).subscribe({
      next: () => this.dialogRef.close('refresh'),
      error: (err) => console.error(err)
    });
  }
}
