import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {CreateOrderComponent} from '../../dialog/create-order/create-order.component';
import {MatDialog, MatRadioChange, MatSelectionListChange} from '@angular/material';
import {ProductModel} from '../../shared/service/models/product.model';
import {ActivatedRoute} from '@angular/router';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {ProductService} from '../../shared/service/backend/product.service';
import {HttpResponse} from '@angular/common/http';
import {ColorModel} from '../../shared/service/models/color.model';

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
  colorId: number;
  sizeId: number;

  selectColours: ColorModel[];
  images: string[] = [];


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
    this.selectColours = [];
  }


  init() {
    console.log(this.product);
    this._productService.findOneProduct(this.productId).subscribe(next => {
      this.product = next;
    }, error => {
      console.error(error);
    });

  }

  selectColor(event: MatRadioChange) {
    if (event.source.checked) {
      this.colorId = event.value.id;
      console.log(this.colorId);
    }
  }


  selectSize(event: MatRadioChange) {
    if (event.source.checked) {
      this.sizeId = event.value.id;
      console.log(this.sizeId);
    }
  }

  createOrder() {
    const dialogRef = this.dialog.open(CreateOrderComponent, {
      width: '35vw',
      data: {idProduct: this.productId, idColor: this.colorId, idSize: this.sizeId}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  nextSlider() {
      // if (this.gallerySlider.nativeElement.clientWidth > 90 && this.translateGallery > (-this.WIDTH_ELEM_GALLERY * ((this.salon.images.length)))) {
      if (this.gallerySlider.nativeElement.clientWidth > 100 && this.translateGallery > ((-25)*4)) {
        if (this.translateGallery != 100 - this.gallerySlider.nativeElement.clientWidth) {
          this.translateGallery -= 25;
          this.gallerySlider.nativeElement.style.transform = 'translateX(' + this.translateGallery + 'vw';
        }
      } else {
        this.translateGallery = 0;
      }
  }

  prevSlider() {
    if (this.translateGallery != 0) {
      this.translateGallery += 25;
      this.gallerySlider.nativeElement.style.transform = 'translateX(' + this.translateGallery + 'vw';
    }
  }

  next() {
    // if (this.mainSlider.nativeElement.clientWidth > 100 && this.translate > (-(30 + 2) * this.salon.images.length)) {
    if (this.mainSlider.nativeElement.clientWidth > 100 && this.translate > (-(24 + 4) * this.product.suggestedProducts.length)) {
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
