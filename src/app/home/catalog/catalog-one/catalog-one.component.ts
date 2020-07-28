import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../shared/service/models/product.model';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ProductService} from '../../../shared/service/backend/product.service';
import {OrderService} from '../../../shared/service/backend/order.service';
import {OrderModel} from '../../../shared/service/models/order.model';
import {CreateOrderComponent} from '../../../dialog/create-order/create-order.component';

@Component({
  selector: 'app-catalog-one',
  templateUrl: './catalog-one.component.html',
  styleUrls: ['./catalog-one.component.css']
})
export class CatalogOneComponent implements OnInit {

  @Input() product: ProductModel;
  createOrder: OrderModel = new OrderModel();

  constructor(private _productService: ProductService,
              private _snackBar: MatSnackBar,
              private _orderService: OrderService,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  order() {
    const dialogRef = this.dialog.open(CreateOrderComponent, {
      width: '35vw',
      data: {productId: this.product}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

}
