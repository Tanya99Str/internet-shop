import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../shared/service/backend/product.service';
import {ProductModel} from '../../shared/service/models/product.model';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {CategoryService} from '../../shared/service/backend/category.service';
import {CategoryModel} from '../../shared/service/models/category.model';
import {MatSlideToggleChange} from '@angular/material';

export class FilterProducts {
  search?: string;
  categoryId?: number = null;
  sortType?: 'ASC' | 'DESC' | '' = '';
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  products: ProductModel[];
  page: number = 0;
  categories: CategoryModel[];
  selectCategoryId: number;
  sort: 'ASC' | 'DESC';
  filterCatalog: FilterProducts = new FilterProducts();
  @ViewChild('searchInput',{static:false}) searchInput: ElementRef;

  constructor(private _productService: ProductService,
              private _categoryService: CategoryService) {
    this.init();
  }

  ngOnInit() {
  }

  init(): void {
    this.filter();
    this._categoryService.query().subscribe((res: HttpResponse<CategoryModel[]>) => (this.categories = res.body || []));
  }

  search() {
    this.filterCatalog.sortType = '';
    this.filterCatalog.categoryId = null;
    this._productService.researcher(this.filterCatalog.search).subscribe(next => {
      this.products = next;
    }, error => {
      console.error(error);
    });
  }

  reset() {
    this.filterCatalog = new FilterProducts();
  }

  filter() {
    this.filterCatalog.search = '';
      this._productService.findAll(this.filterCatalog.categoryId, this.filterCatalog.sortType).subscribe(next => {
        this.products = next;
      }, error => {
        console.error(error);
      });
  }



  changeTypeSort(e: MatSlideToggleChange) {
    console.log(this.filterCatalog.sortType);
    if (e.checked) {
      this.filterCatalog.sortType='DESC';
      console.log(this.filterCatalog.sortType);
    }
    if (!e.checked) {
      this.filterCatalog.sortType='ASC';
      console.log(this.filterCatalog.sortType);
    }
    console.log(this.filterCatalog.sortType);
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
