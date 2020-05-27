import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {CancelOrderComponent} from '../../../dialog/cancel-order/cancel-order.component';

@Component({
  selector: 'app-one-order',
  templateUrl: './one-order.component.html',
  styleUrls: ['./one-order.component.css']
})
export class OneOrderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  cancelOrder() {
    const dialogRef = this.dialog.open(CancelOrderComponent, {
      width: '25vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  ngOnInit() {
  }



}
