import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { HttpClient } from '@angular/common/http';
import { urlEndpoint } from '../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  getOrders(id:number):Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/orders/get/${id}`)
  }
  getAllOrders():Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/orders/get`)
  }
  setStatus(body:any):Observable<AppResponse>{
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/admin/orders/status`,body)
  }
}
