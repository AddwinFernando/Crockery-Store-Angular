import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from 'src/app/model/appResponse';
import { Item } from 'src/app/model/item';
import { urlEndpoint } from 'src/app/utils/constant';

@Injectable({
  providedIn: 'root',
})
export class AdminHomeService {
  error: String = '';
  constructor(private http: HttpClient) {}
  getProducts(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/item/all`);
  }
  getProduct(id:number): Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/item/${id}`)
  }
  addProduct(body:Item): Observable<AppResponse>{
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/admin/item/add`,body);
  }
  deletePoduct(id:number|null):Observable<AppResponse>{
    return this.http.delete<AppResponse>(`${urlEndpoint.baseUrl}/admin/item/delete/${id}`)
  }
  updateProduct(body:Item): Observable<AppResponse>{
    return this.http.put<AppResponse>(`${urlEndpoint.baseUrl}/admin/item/update`,body);
  }
}
