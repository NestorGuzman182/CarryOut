import { Injectable } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private myShoppingCart: IProduct[] = [];
  private myCart = new BehaviorSubject<IProduct[]>([]);

  myCart$ = this.myCart.asObservable();


  addProduct(product: IProduct) {
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  getShoppingCart() {
    return this.myShoppingCart;
  }

  getTotal() {
    return this.myShoppingCart.reduce((acc, product) => acc + product.price, 0);
  }
}
