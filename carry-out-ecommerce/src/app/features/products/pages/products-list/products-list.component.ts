import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import ProductComponent from '../../components/product/product.component';
import { IProduct, ICreateProductDTO, IUpdateProductDTO } from '../../../../core/models/product.model';
import { StoreService } from '../../../../core/services/store/store.service';
import { ProductService } from '../../../../core/services/product/product.service';
import { register } from 'swiper/element/bundle';
register()

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ CommonModule, ProductComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export default class ListComponent implements OnInit {
  private storeService = inject(StoreService);
  private productService = inject(ProductService);

  myShoppingCart: IProduct[] = [];
  total = signal(0);
  products = signal<IProduct[]>([]);
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
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';


  ngOnInit() {
    this.productService.getAllProducts(10, 0)
      .subscribe( (data: IProduct[]) => this.products.set(data));
    this.storeService.getShoppingCart();
    this.total.set(this.storeService.getTotal());
  }

  onAddToShoppingCart(product: IProduct) {
    this.storeService.addProduct(product);
    this.total.set(this.storeService.getTotal());
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.productService.getProduct(id)
      .subscribe({
        next: (data: IProduct) => {
          this.toggleproductDetail();
          this.productChosen = data;
          this.statusDetail = 'success';
        },
        error: errorMessage => {
          alert(errorMessage);
          this.statusDetail = 'error';
        }
      });
  }

  toggleproductDetail() {
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

  loadMore() {
    this.productService.getProductsBypage(this.limit, this.offset)
    .subscribe( (data: IProduct[]) => {
      this.products.set(this.products().concat(data))
      this.offset += this.limit
    });
  }
}


