import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  orderFormGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateOrderComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private _formBuilder: FormBuilder,
              public router: Router) { }

  ngOnInit() {
    this.orderFormGroup = this._formBuilder.group({
      city: ['', [Validators.required]],
      postOffice: ['', [Validators.required]]
    });
  }

}
