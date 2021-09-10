import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseObjectUsers, ResponseObjectCreate, RequestObjectCreate, RequestObjectUpdateUser, ResponseObjectUser, ResponseObjectUpdateUser, } from './user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private path = `${environment.api}/users`
  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<ResponseObjectUsers> {
    return this.http.get<ResponseObjectUsers>(`${this.path}?page=${page}`)
  }
  createUser(request: RequestObjectCreate): Observable<ResponseObjectCreate> {
    return this.http.post<ResponseObjectCreate>(this.path, request);
  }
  getUser(id: string): Observable<ResponseObjectUser> {
    return this.http.get<ResponseObjectUser>(`${this.path}/${id}`);
  }
  updateUser(id: string, request: RequestObjectUpdateUser): Observable<ResponseObjectUpdateUser> {
    return this.http.put<ResponseObjectUpdateUser>(`${this.path}/${id}`, request);
  }
  deleteUser(id: string):Observable<any>{
    return this.http.delete<any>(`${this.path}/${id}`);
  }

}
