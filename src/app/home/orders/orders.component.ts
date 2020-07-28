import { Component, OnInit } from '@angular/core';
import {CreateOrderComponent} from '../../dialog/create-order/create-order.component';
import {CancelOrderComponent} from '../../dialog/cancel-order/cancel-order.component';
import {OrdersService} from '../../shared/service/backend/orders.service';
import {OrdersModel} from '../../shared/service/models/orders.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: OrdersModel[];

  constructor(private _ordersService: OrdersService) {
    this.init();
  }

  ngOnInit() {
  }

  init(): void {
    this._ordersService.findAll().subscribe(next => {
      this.orders = next;
    }, error => {
      console.error(error);
    });
  }

}
