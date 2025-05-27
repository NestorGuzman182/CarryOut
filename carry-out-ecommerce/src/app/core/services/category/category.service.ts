import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IProduct } from '../../models/product.model';
import { ICategory } from '../../models/category.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiUrl = environment.API_URL + '/api/v1/categories/';

  getAll() {
    return this.http.get<ICategory[]>(this.apiUrl);
  }

  getByCategory(categoryId: string, limit?: number, offset?: number) {
    const params = new HttpParams();
    if(limit && offset) {
      params.set('limit', limit);
      params.set('offset', offset);
    }
    return this.http.get<IProduct[]>(`${this.apiUrl}${categoryId}/products/`, { params })
  }

}
