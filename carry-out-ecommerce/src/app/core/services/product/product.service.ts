import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { IProduct, ICreateProductDTO, IUpdateProductDTO } from '../../models/product.model';
import { retry, catchError, throwError, map } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.API_URL + '/api/v1/products/';

  getAllProducts(limit?: number, offset?: number) {
    const params = new HttpParams();
    if (limit && offset) {
        params.set('limit', limit)
        params.set('offset', offset);
    }
    return this.http.get<IProduct[]>(this.apiUrl, { params })
      .pipe(
        retry(3),
        map((products: IProduct[]) => products.map((product: IProduct) => {
          return {
            ...product,
            taxes: product.price * 0.19
          }
        })),
      );
  }

  getProduct(id: string) {
    return this.http.get<IProduct>(`${this.apiUrl}${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if(error.status === HttpStatusCode.Conflict) {
            return throwError(() => new Error('Ups! el server esta fallando.'));
          }
          if(error.status === HttpStatusCode.NotFound) {
            return throwError(() => new Error('Ups! el producto no existe.'));
          }
          return throwError(() => new Error ('Ups! algo salió mal, por favor intenta más tarde.'));
        })
      );
  }

  getProductsBypage(limit: number, offset: number) {
    return this.http.get<IProduct[]>(this.apiUrl , {
      params: {
        limit: limit,
        offset: offset
      }
    })
  }

  create(product: ICreateProductDTO) {
    return this.http.post<IProduct>(this.apiUrl, product);
  }

  update(id: string, product: IUpdateProductDTO) {
    return this.http.put<IProduct>(`${this.apiUrl}${id}`, product);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}${id}`);
  }

}
