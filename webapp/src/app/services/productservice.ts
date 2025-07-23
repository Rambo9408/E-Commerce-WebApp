import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Productinterface } from '../interfaces/productinterface';


@Injectable({
  providedIn: 'root'
})

export class Productservice {
  private getUrl = "http://localhost:3000/products";
  private addUrl = "http://localhost:3000/products/addProducts";
  private updateUrl = "http://localhost:3000/products/updateProduct";
  private deleteUrl = "http://localhost:3000/products/deleteProduct";
  private offerAdd = "http://localhost:3000/offers/add";
  private offerUpdate = "http://localhost:3000/offers/update";

  constructor(private http: HttpClient) { }

  // GET Category
  getProducts(): Observable<Productinterface[]> {
    return this.http.get<Productinterface[]>(this.getUrl);
  }

  //Get Category by Id
  getProductById(_id: string): Observable<Productinterface> {
    return this.http.get<Productinterface>(`${this.getUrl}/${_id}`);
  }

  // POST Category
  addProduct(product: FormData): Observable<Productinterface> {
    return this.http.post<Productinterface>(this.addUrl, product);
  }

  //Update Category
  updateProduct(_id: string, data: Omit<Productinterface, 'id'>): Observable<Productinterface> {
    return this.http.put<Productinterface>(`${this.updateUrl}/${_id}`, data);
  }

  //Delete Category
  deleteProduct(_id: string): Observable<Productinterface> {
    return this.http.delete<Productinterface>(`${this.deleteUrl}/${_id}`);
  }

  updateOffer(id: string, data : any) {
    return this.http.post<Productinterface>(`${this.offerUpdate}/${id}`, data);
  }

  addOffer(id: string, data: any){
    return this.http.post<Productinterface>(`${this.offerAdd}/${id}`, data);
  }

}
