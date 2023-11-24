import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from 'src/app/model/appResponse';
import { Category } from 'src/app/model/category';
import { urlEndpoint } from 'src/app/utils/constant';

@Injectable({
  providedIn: 'root',
})
export class AdminCategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/category/all`
    );
  }
  addCategory(body:Category):Observable<AppResponse>{
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/admin/category/add`,body)
  }
  deleteCategory(id:number):Observable<AppResponse>{
    return this.http.delete<AppResponse>(`${urlEndpoint.baseUrl}/admin/category/delete/${id}`)
  }
  updateCategory(body:Category):Observable<AppResponse>{
    return this.http.put<AppResponse>(`${urlEndpoint.baseUrl}/admin/category/update`,body)
  }
}
