import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProductService} from '../../shared/service/backend/product.service';
import {ProductModel} from '../../shared/service/models/product.model';
import {NewOrderDto} from '../../shared/service/models/new-order.dto';
import {RegisterService} from '../../shared/service/backend/register.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  orderFormGroup: FormGroup;
  newOrder: NewOrderDto = new NewOrderDto();

  constructor(public dialogRef: MatDialogRef<CreateOrderComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {idProduct: number, idColor: number, idSize: number},
              public dialog: MatDialog,
              private _formBuilder: FormBuilder,
              public router: Router,
              private _productService: ProductService,
              private _snackBar: MatSnackBar,
              private _registerService: RegisterService) {
    console.log(this.data);
  }

  order() {
    this.newOrder.cityTo = this.orderFormGroup.get('city').value;
    this.newOrder.postNumber = this.orderFormGroup.get('postOffice').value;
    this.newOrder.colourId = this.data.idColor;
    this.newOrder.sizeId = this.data.idSize;
    this._productService.createOrder(this.data.idProduct, this.newOrder).subscribe(next => {
      this.info('Ви успішно створили замовлення.');
    }, error => {
      console.error(error);
      this.info('Ви успішно створили замовлення.');
    })
  }

  info(message: string) {
    this._snackBar.open(message, 'ок', {
      duration: 10000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      announcementMessage: message,
      politeness: 'polite',
      direction: 'ltr'
    });
  }

  ngOnInit() {
    this.orderFormGroup = this._formBuilder.group({
      city: ['', [Validators.required]],
      postOffice: ['', [Validators.required]]
    });
  }

}
