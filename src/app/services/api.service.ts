import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL = "http://localhost:3000/userlist";
  constructor(private http: HttpClient) { }

  //Service created for add User functionality.
  postU(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}`, data).pipe(tap(data => console.log(data)))
  }

  //Service created for fetch User functionality.
  getU(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}`).pipe(tap(data => console.log(data)))
  }

  getUById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/${id}`).pipe(tap(data => console.log(data)))
  }

  //Service created for update User functionality.
  updateU(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.baseURL}/${id}`, data).pipe(tap(data => console.log(data)))
  }

  //Service created for delete User functionality.
  deleteU(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/${id}`).pipe(tap(data => console.log(data)))
  }
  getStates(): Observable<any> {
    return this.http.get("http://localhost:3000/states")
  }
  getCountryCode(): Observable<any> {
    return this.http.get("http://localhost:3000/phonecode")
  }
  getadminCred(): Observable<any>{
    return this.http.get("http://localhost:3000/credentials")
  }
  getcategory(): Observable<any>{
    return this.http.get("http://localhost:3000/category")
  }
  getReviews(): Observable<any>{
    return this.http.get("http://localhost:3000/reviews").pipe(tap(data => console.log(data)));
  }
  postReviews(data:any): Observable<any>{
    return this.http.post("http://localhost:3000/reviews", data).pipe(tap(data => console.log(data)));
  }

}
