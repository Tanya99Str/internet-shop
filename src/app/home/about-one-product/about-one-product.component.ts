import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-about-one-product',
  templateUrl: './about-one-product.component.html',
  styleUrls: ['./about-one-product.component.css']
})
export class AboutOneProductComponent implements OnInit {

  orderFormGroup: FormGroup;
  translateGallery: number = 0;
  WIDTH_ELEM_GALLERY = 100;

  @ViewChild('gallerySlider', {static: false}) gallerySlider: ElementRef;

  constructor() { }


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

  ngOnInit() {
  }

}
