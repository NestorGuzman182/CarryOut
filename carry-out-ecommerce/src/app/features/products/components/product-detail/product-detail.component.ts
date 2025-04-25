import { CommonModule } from '@angular/common';
import { Component,
        CUSTOM_ELEMENTS_SCHEMA,
        EventEmitter,
        inject, Input, Output } from '@angular/core';
import { IProduct } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ CommonModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  @Input() productChosen!: IProduct;
  @Input() showProductDetail!: boolean;
  @Input() statusDetail!: 'loading' | 'success' | 'error' | 'init';

  @Output() update = new EventEmitter<IProduct>();
  @Output() delete = new EventEmitter<IProduct>();
  @Output() toggleClose = new EventEmitter<void>();

  private productService = inject(ProductService);
  products = this.productService.getAllProducts();

  toggleProductDetail() {
    this.toggleClose.emit();
  }

  updateProduct() {
    this.update.emit();
  }

  deleteProduct() {
    this.delete.emit();
  }
}
