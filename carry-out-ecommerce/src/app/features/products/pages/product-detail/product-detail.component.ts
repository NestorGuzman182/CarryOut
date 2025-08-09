import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  inject, Input, Output, OnInit,
  ViewChild,
  ElementRef, AfterViewInit
} from '@angular/core';
import { IProduct } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { SwiperContainer } from 'swiper/element';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export default class ProductDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef<SwiperContainer>;

  @Input() productChosen!: IProduct;
  @Input() showProductDetail!: boolean;
  @Input() statusDetail!: 'loading' | 'success' | 'error' | 'init';

  @Output() update = new EventEmitter<IProduct>();
  @Output() delete = new EventEmitter<IProduct>();
  @Output() toggleClose = new EventEmitter<void>();

  productId: string | null = null;
  product: IProduct | null = null;
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  products = this.productService.getAll();

  ngOnInit() {
    register() // registra web components
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.productId = params.get('id');
          if (this.productId) {
            return this.productService.getProduct(this.productId)
          }
          return [null]
        })
      )
      .subscribe((data) => {
        this.product = data;
      })
  }

  ngAfterViewInit() {
    this.initializeSwiper();
  }

  /*    private initializeSwiper() {
      if (!this.swiperContainer?.nativeElement) return;

      const swiperEl = this.swiperContainer.nativeElement;
      Object.assign(swiperEl, {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
          clickable: true,
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      });
      swiperEl.initialize();
    } */

  private initializeSwiper() {
    if (!this.swiperContainer?.nativeElement || !this.product?.images?.length) return;

    const swiperEl = this.swiperContainer.nativeElement;

    // Limpia cualquier inicialización previa
    /*   if (swiperEl.initialized) {
        swiperEl.destroy();
      } */

    Object.assign(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: this.product.images.length > 1,
      pagination: {
        clickable: true,
        el: '.swiper-pagination'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      /*     watchSlidesProgress: true,
          resistanceRatio: 0.5 */
    });

    swiperEl.initialize();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  goToBack() {
    this.router.navigate(['/products'])
    //this.toggleClose.emit();
  }

  updateProduct() {
    this.update.emit();
  }

  deleteProduct() {
    this.delete.emit();
  }
}
