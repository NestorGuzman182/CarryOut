import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product/product.service';
import { CategoryService } from '../../../core/services/category/category.service';
import { IProduct } from '../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import ListComponent from '../../products/components/products-list/products-list.component';
import { switchMap } from 'rxjs';
import { CategoryMenuComponent } from '../../../shared/components/category-menu/category-menu.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ CommonModule, ListComponent, CategoryMenuComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export default class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  productId: string | null = null;
  limit = 10;
  offset = 0;
  products = signal<IProduct[]>([]);

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService)

  ngOnInit() {
     this.route.paramMap.pipe(
      switchMap(params => {
        this.categoryId = params.get('id')

        if(this.categoryId) {
          return this.categoryService.getByCategory(this.categoryId, this.limit, this.offset)
        } else {
          return []
        }
      }))
      .subscribe((data) => {
        this.products.set(data);
      })

      this.route.queryParamMap
        .subscribe( params => {
          this.productId = params.get('product');
        })

/*       .subscribe(params => {
      this.categoryId = params.get('id')
      if(this.categoryId) {
        this.productService.getByCategory(this.categoryId, this.limit, this.offset)
          .subscribe((data) => {
            this.products.set(data);
          })
      }
    }) */
  }

  onLoadMore() {
    console.log('hola desde catregory');
  }

}
