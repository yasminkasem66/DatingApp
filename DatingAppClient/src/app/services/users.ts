import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root',
})
export class Users {
   private baseUrl = 'https://localhost:5001/api/Members';

  constructor(private http: HttpClient) {}

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl);
  }

  getMemberById(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.baseUrl}/${id}`);
  }

  createMember(data: Member): Observable<Member> {
    return this.http.post<Member>(this.baseUrl, data);
  }

  updateMember(id: number, data: Member): Observable<Member> {
    return this.http.put<Member>(`${this.baseUrl}/${id}`, data);
  }

  deleteMember(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  } 
}
