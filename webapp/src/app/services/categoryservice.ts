import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoryinterface } from '../interfaces/categoryinterface';

@Injectable({
  providedIn: 'root'
})
export class Categoryservice {
  private getUrl = "http://localhost:3000/category"
  private addUrl = "http://localhost:3000/category/addCategory"
  private updateUrl = "http://localhost:3000/category/updateCategory"
  private deleteUrl = "http://localhost:3000/category/deleteCategory"
  constructor(private http:HttpClient){}

   // GET Category
  getCategories(): Observable<Categoryinterface[]> {
    return this.http.get<Categoryinterface[]>(this.getUrl);
  }

  //Get Category by Id
  getCategoryById(_id: string):Observable<Categoryinterface>{
    return this.http.get<Categoryinterface>(`${this.getUrl}/${_id}`);
  }

  // POST Category
  addCategory(category: Categoryinterface): Observable<Categoryinterface> {
    return this.http.post<Categoryinterface>(this.addUrl, category);
  }

  //Update Category
  updateCategory(_id: string, data: Omit<Categoryinterface, 'id'>):Observable<Categoryinterface>{
    return this.http.put<Categoryinterface>(`${this.updateUrl}/${_id}`, data);
  }

  //Delete Category
  deleteCategory(_id: string):Observable<Categoryinterface>{
    return this.http.delete<Categoryinterface>(`${this.deleteUrl}/${_id}`);
  }
}
