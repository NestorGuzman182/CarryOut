import { CommonModule } from '@angular/common';
import { Component, signal, OnInit, inject } from '@angular/core';
import ListComponent from '../../components/products-list/products-list.component';
import { IProduct } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product/product.service';
import { CategoryMenuComponent } from '../../../../shared/components/category-menu/category-menu.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [ CommonModule, ListComponent, CategoryMenuComponent ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})

export default class ProductsPageComponent implements OnInit {
  limit = 10;
  offset = 0;
  productId: string | null = null;
  products = signal<IProduct[]>([]);
  productService = inject(ProductService);
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.productService.getAll(this.limit, this.offset)
    .subscribe((data: IProduct[]) => {
      this.products.set(data);
      this.offset += this.limit;
    });
    this.route.queryParamMap
    .subscribe( params => {
      this.productId = params.get('product');
      console.log(this.productId);
    })

  }

  onLoadMore() {
    this.productService.getAll(this.limit, this.offset)
    .subscribe((data: IProduct[]) => {
      this.products.update((prev) => [...prev, ...data]);
      this.offset += this.limit;
    });
    console.log('padre recibiendo');
  }
}
