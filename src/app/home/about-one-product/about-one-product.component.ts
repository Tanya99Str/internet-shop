import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {CreateOrderComponent} from '../../dialog/create-order/create-order.component';
import {MatDialog} from '@angular/material';

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

  constructor(public dialog: MatDialog) { }

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
        this.translate -= 24 + 2;
        this.mainSlider.nativeElement.style.transform = 'translateX(' + this.translate + 'vw)';
      }
    }
  }

  back() {
    if (this.translate != 0) {
      this.translate += 24 + 2;
      this.mainSlider.nativeElement.style.transform = 'translateX(' + this.translate + 'vw)';
    }
  }

  ngOnInit() {
  }

}
