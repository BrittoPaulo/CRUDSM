import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseObjectUsers,ResponseObjectCreate,RequestObjectCreate } from './user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private path = `${environment.api}/users`
  constructor(private http: HttpClient) { }

  getUsers(page:number): Observable<ResponseObjectUsers> {
    return this.http.get<ResponseObjectUsers>(`${this.path}?page=${page}`)
  }
  createUser(request: RequestObjectCreate):Observable<ResponseObjectCreate>{
    return this.http.post<ResponseObjectCreate>(this.path, request);
  }

}
