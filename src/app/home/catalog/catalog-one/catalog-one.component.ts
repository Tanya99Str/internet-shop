import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../shared/service/models/product.model';
import {MatSnackBar} from '@angular/material';
import {ProductService} from '../../../shared/service/backend/product.service';

@Component({
  selector: 'app-catalog-one',
  templateUrl: './catalog-one.component.html',
  styleUrls: ['./catalog-one.component.css']
})
export class CatalogOneComponent implements OnInit {

  @Input() product: ProductModel;

  constructor(private _productService: ProductService,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

}
