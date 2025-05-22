import { CommonModule } from '@angular/common';
import { Component, inject, signal, CUSTOM_ELEMENTS_SCHEMA, Input, WritableSignal, Output, EventEmitter } from '@angular/core';
import ProductComponent from '../product/product.component';
import { IProduct, ICreateProductDTO, IUpdateProductDTO } from '../../../../core/models/product.model';
import { StoreService } from '../../../../core/services/store/store.service';
import { ProductService } from '../../../../core/services/product/product.service';
import { register } from 'swiper/element/bundle';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
register()

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ CommonModule, ProductComponent, ProductDetailComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export default class ListComponent {

  @Input() products!: WritableSignal<IProduct[]>;
  @Input() categoryId: string | null = null;
  @Output() loadMore = new EventEmitter<void>();


  private storeService = inject(StoreService);
  private productService = inject(ProductService);

  myShoppingCart: IProduct[] = [];
  total = signal(0);
  showProductDetail = false;
  productChosen: IProduct = {
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
  };
/*   limit = 10;
  offset = 0; */
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';


/*   ngOnInit() {
    if (this.categoryId) {
      this.productService.getByCategory(this.categoryId, this.limit, this.offset)
        .subscribe((data: IProduct[]) => {
          this.products.set(data);
        });
    } else {
      this.productService.getAll(this.limit, this.offset)
      .subscribe((data: IProduct[]) => {
        this.products.set(data);
        this.offset += this.limit;
      });
    }

    this.storeService.getShoppingCart();
    this.total.set(this.storeService.getTotal());
  } */


  onAddToShoppingCart(product: IProduct) {
    this.storeService.addProduct(product);
    this.total.set(this.storeService.getTotal());
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    console.log(this.statusDetail);
    this.productService.getProduct(id)
      .subscribe({
        next: (data: IProduct) => {
          this.toggleProductDetail();
          this.productChosen = data;
          this.statusDetail = 'success';
        },
        error: errorMessage => {
          alert(errorMessage);
          this.statusDetail = 'error';
        }
      });
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  createNewProduct() {
    const product: ICreateProductDTO = {
      title: 'New Product Red',
      price: 1000,
      description: 'Description red clothes',
      images: ['https://placeimg.com/640/480/'],
      categoryId: 29
    }
    this.productService.create(product)
      .subscribe(data => {
        console.log('Created success!', data);
        this.products().unshift(data)
      });
  }

  updateProduct() {
    const id = this.productChosen.id;
    const changes: IUpdateProductDTO = {
      title: 'Classic Pink Vans Shoes'
    }

    this.productService.update(id, changes)
      .subscribe( data => {
        console.log('Updated success!', data);
        const productIndex = this.products().findIndex(item => item.id === id);
        this.products()[productIndex] = data;
      })

  }

  deleteProduct() {
    const id = this.productChosen.id;

    this.productService.delete(id)
      .subscribe( () => {
        console.log('deteletd success!');
        //const productIndex = this.products().findIndex(item => item.id === id);
        // this.products().splice(productIndex, 1);                               version anterior a la 17
        this.products.update( (products) => products.filter(item => item.id !== id));
        this.showProductDetail = false;
      })
  }

  onLoadMore() {
    console.log('enviando desde hijo');
    this.loadMore.emit();
  }
/*   loadMore() {
    this.productService.getProductsBypage(this.limit, this.offset)
    .subscribe( (data: IProduct[]) => {
      this.products.set(this.products().concat(data))
      this.offset += this.limit
    });
  } */
}


