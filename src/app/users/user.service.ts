import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseObjectUsers } from './user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private path = `${environment.api}/users`
  constructor(private http: HttpClient) { }

  getUsers(page:number): Observable<ResponseObjectUsers> {
    return this.http.get<ResponseObjectUsers>(`${this.path}?page=${page}`)
  }

}
