import { Component, OnInit } from '@angular/core';
import {CreateOrderComponent} from '../../dialog/create-order/create-order.component';
import {CancelOrderComponent} from '../../dialog/cancel-order/cancel-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
