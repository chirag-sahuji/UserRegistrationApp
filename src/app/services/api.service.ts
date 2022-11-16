import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  //Service created for add User functionality.
  postU(data: any): Observable<any> {
    return this.http.post<any>("http://localhost:3000/userlist/", data).pipe(tap(data => console.log(data)))
  }

  //Service created for fetch User functionality.
  getU(): Observable<any> {
    return this.http.get<any>("http://localhost:3000/userlist/").pipe(tap(data => console.log(data)))
  }

  //Service created for update User functionality.
  updateU(data: any, id: number): Observable<any> {
    return this.http.put<any>("http://localhost:3000/userlist/" + id, data).pipe(tap(data => console.log(data)))
  }

  //Service created for delete User functionality.
  deleteU(id: number): Observable<any> {
    return this.http.delete<any>("http://localhost:3000/userlist/" + id).pipe(tap(data => console.log(data)))
  }

}
