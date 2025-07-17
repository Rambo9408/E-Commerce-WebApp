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
  // private updateUrl = "http://localhost:3000/category"
  // private deleteUrl = "http://localhost:3000/category"
  // private getUrlById = "http://localhost:3000/category"
  constructor(private http:HttpClient){}
   // GET all employees
  getCategories(): Observable<Categoryinterface[]> {
    return this.http.get<Categoryinterface[]>(this.getUrl);
  }

  // POST new employee
  addCategory(category: Categoryinterface): Observable<Categoryinterface> {
    return this.http.post<Categoryinterface>(this.addUrl, category);
  }
}
