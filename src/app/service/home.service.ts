import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { AppResponse } from '../model/appResponse';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  error: String = '';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/item/all`);
  }

  addToCart(body:any): Observable<AppResponse> {
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/cart/add`,body);
  }
  
  getUserCart(id:number): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/cart/get/${id}`);
  }

  removeFromCart(userId:number,id:number): Observable<AppResponse>{
    return this.http.delete<AppResponse>(`${urlEndpoint.baseUrl}/cart/remove/${userId}/${id}`);
  }

}
