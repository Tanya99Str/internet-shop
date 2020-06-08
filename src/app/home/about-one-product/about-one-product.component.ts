import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {CreateOrderComponent} from '../../dialog/create-order/create-order.component';
import {MatDialog} from '@angular/material';
import {ProductModel} from '../../shared/service/models/product.model';
import {ActivatedRoute} from '@angular/router';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {ProductService} from '../../shared/service/backend/product.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-about-one-product',
  templateUrl: './about-one-product.component.html',
  styleUrls: ['./about-one-product.component.css']
})
export class AboutOneProductComponent implements OnInit {

  orderFormGroup: FormGroup;
  translateGallery: number = 0;
  translate: number = 0;
  WIDTH_ELEM_GALLERY = 100;

  @ViewChild('gallerySlider', {static: false}) gallerySlider: ElementRef;
  @ViewChild('mainSlider', {static: false}) mainSlider: ElementRef;

  product: ProductModel;
  productId: number;


  constructor(public dialog: MatDialog,
              private _activatedRoute: ActivatedRoute,
              private _productService: ProductService) {
    this._activatedRoute.queryParams.subscribe(value => {
      if (isNotNullOrUndefined(value['product_id'])) {
        this.productId = parseInt(value['product_id']);
        console.log(this.productId);
        this.init();
      }
    });
  }


  init() {
    console.log(this.product);
    this._productService.findUserById(this.productId).subscribe(next => {
      this.product = next;
    }, error => {
      console.error(error);
    });

  }

  createOrder() {
    const dialogRef = this.dialog.open(CreateOrderComponent, {
      width: '35vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  nextSlider() {
      // if (this.gallerySlider.nativeElement.clientWidth > 90 && this.translateGallery > (-this.WIDTH_ELEM_GALLERY * ((this.salon.images.length)))) {
      if (this.gallerySlider.nativeElement.clientWidth > 100) {
        if (this.translateGallery != 100 - this.gallerySlider.nativeElement.clientWidth) {
          this.translateGallery -= this.WIDTH_ELEM_GALLERY;
          this.gallerySlider.nativeElement.style.transform = 'translateX(' + this.translateGallery + '%';
        }
      }
  }

  prevSlider() {
    if (this.translateGallery != 0) {
      this.translateGallery += 100;
      this.gallerySlider.nativeElement.style.transform = 'translateX(' + this.translateGallery + '%)';
    }
  }

  next() {
    // if (this.mainSlider.nativeElement.clientWidth > 100 && this.translate > (-(30 + 2) * this.salon.images.length)) {
    if (this.mainSlider.nativeElement.clientWidth > 100) {
      if (this.translate != 100 - this.mainSlider.nativeElement.clientWidth) {
        this.translate -= 24 + 4;
        this.mainSlider.nativeElement.style.transform = 'translateX(' + this.translate + 'vw)';
      }
    }
  }

  back() {
    if (this.translate != 0) {
      this.translate += 24 + 4;
      this.mainSlider.nativeElement.style.transform = 'translateX(' + this.translate + 'vw)';
    }
  }

  ngOnInit() {
  }

}
