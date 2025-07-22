import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Employeeinterface } from '../interfaces/employeeinterface';

@Injectable({
  providedIn: 'root'
})
export class Employeeservice {
  private apiUrl = "http://localhost:3000/user/loggedinUser";
  private getUrl = "http://localhost:3000/user/Employees";
  private addUrl = "http://localhost:3000/user/addEmployee";
  private updateUrl = "http://localhost:3000/user/updateEmployee";
  private deleteUrl = "http://localhost:3000/user/deleteEmployee";

  constructor(private http: HttpClient) { }

  //get the current logged in employee
  getCurrentEmployee(): Observable<Employeeinterface> {
    return this.http.get<Employeeinterface>(`${this.apiUrl}`);
  }

  // GET Category
  getEmployees(): Observable<Employeeinterface[]> {
    return this.http.get<Employeeinterface[]>(this.getUrl);
  }

  //Get Category by Id
  getEmployeeById(_id: string): Observable<Employeeinterface> {
    return this.http.get<Employeeinterface>(`${this.getUrl}/${_id}`);
  }

  // POST Category
  addEmployee(emp: FormData): Observable<Employeeinterface> {
    return this.http.post<Employeeinterface>(this.addUrl, emp);
  }

  //Update Category
  updateEmployee(_id: string, data: Omit<Employeeinterface, 'id'>): Observable<Employeeinterface> {
    return this.http.put<Employeeinterface>(`${this.updateUrl}/${_id}`, data);
  }

  //Delete Category
  deleteEmployee(_id: string): Observable<Employeeinterface> {
    return this.http.delete<Employeeinterface>(`${this.deleteUrl}/${_id}`);
  }
}
