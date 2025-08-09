import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export default class ProductComponent {

  @Input() product: IProduct = {
    id: '',
    price: 0,
    title: '',
    images: [],
    description: '',
    category: {
      id: 0,
      name: '',
      typeImg: ''
    }
  }
  @Output() addToCartProduct = new EventEmitter<IProduct>();
  @Output() showDetailProduct = new EventEmitter<string>();

  onAddToCart() {
    console.log('Add to cart', this.product);
    this.addToCartProduct.emit(this.product);
  }

  onShowDetail() {
    console.log('Show detail', this.product);
    this.showDetailProduct.emit(this.product.id);
  }
}
