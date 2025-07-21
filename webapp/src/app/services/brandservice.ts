import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Brandinterface } from '../interfaces/brandinterface';

@Injectable({
  providedIn: 'root'
})
export class Brandservice {
  private getUrl = "http://localhost:3000/brand/allbrands";
  private getByIdUrl = "http://localhost:3000/brand/getbrand";
  private addUrl = "http://localhost:3000/brand/addbrand";
  private updateUrl = "http://localhost:3000/brand/updatebrand";
  private deleteUrl = "http://localhost:3000/brand/deleteBrand";

  constructor(private http: HttpClient) { }

  // GET Category
  getBrands(): Observable<Brandinterface[]> {
    return this.http.get<Brandinterface[]>(this.getUrl);
  }

  //Get Category by Id
  getBrandById(_id: string): Observable<Brandinterface> {
    return this.http.get<Brandinterface>(`${this.getByIdUrl}/${_id}`);
  }

  // POST Category
  addBrand(category: Brandinterface): Observable<Brandinterface> {
    return this.http.post<Brandinterface>(this.addUrl, category);
  }

  //Update Category
  updateBrand(_id: string, data: Omit<Brandinterface, 'id'>): Observable<Brandinterface> {
    return this.http.put<Brandinterface>(`${this.updateUrl}/${_id}`, data);
  }

  //Delete Category
  deleteBrand(_id: string): Observable<Brandinterface> {
    return this.http.delete<Brandinterface>(`${this.deleteUrl}/${_id}`);
  }

}
