import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../shared/service/backend/product.service';
import {ProductModel} from '../../shared/service/models/product.model';
import {HttpHeaders, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  products: ProductModel[];
  page: number = 0;

  constructor(private _productService: ProductService) {
    this.init();
  }

  ngOnInit() {
  }

  init(): void {
    this._productService.query().subscribe((res: HttpResponse<ProductModel[]>) =>  (this.products = res.body || []));
  }

  trackId(index: number, item: ProductModel): number {
    return item.id!;
  }

  paginateProducts(data: ProductModel[] | null, headers: HttpHeaders): void {
    // const headersLink = headers.get('link');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.products.push(data[i]);
      }
    }
  }

}
