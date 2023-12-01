import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Address } from '../model/address';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  getUserAddress(id:number):Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/address/${id}`)
  }

  addAddress(body:Address):Observable<AppResponse>{
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/address/add`,body)
  }
  deleteAddress(user:number,id:number):Observable<AppResponse>{
    return this.http.delete<AppResponse>(`${urlEndpoint.baseUrl}/address/${user}/${id}`)
  }
  updateAddress(body:any):Observable<AppResponse>{
    return this.http.put<AppResponse>(`${urlEndpoint.baseUrl}/address/update`,body)
  }

}
