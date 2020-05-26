import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpFormGroup: FormGroup;
  hide = true;
  hideNewPass = true;
  hideRepeatPass = true;

  constructor(private _formBuilder: FormBuilder,
              private _snackBar: MatSnackBar, public dialog: MatDialog,
              public router: Router) { }

  ValidationData(group: FormGroup) {
    let name = group.get('name').value;
    let lastName = group.get('lastName').value;
    let middleName = group.get('middleName').value;
    let pass = group.get('password').value;
    let repeatPassword = group.get('repeatPassword').value;
    let phone: string = group.get('phone').value;
    let email: string = group.get('email').value;

    if (!name) {
      group.get('name').setErrors({required: true});
    }
    if (!lastName) {
      group.get('lastName').setErrors({required: true});
    }
    if (!middleName) {
      group.get('middleName').setErrors({required: true});
    }
    if (pass) {
      let mRe = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      if (!mRe.exec(pass)) {
        group.get('password').setErrors({incorrect: true});
      }
    }
    if (!pass) {
      group.get('password').setErrors({required: true});
    }
    if (!repeatPassword) {
      group.get('repeatPassword').setErrors({required: true});
    } else {
      group.get('repeatPassword').setErrors(null);
    }
    if (pass !== repeatPassword) {
      group.get('repeatPassword').setErrors({notSame: true});
    } else {
      group.get('repeatPassword').setErrors(null);
    }

    if (!(phone || email)) {
      group.get('phone').setErrors({required: true});
      group.get('email').setErrors({required: true});
    } else {
      if (email) {
        let mRe = new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');
        if (!mRe.exec(email)) {
          group.get('email').setErrors({incorrect: true});
          group.get('phone').setErrors(null);
          return;
        }
      }
      if (phone) {
        let pRe = new RegExp('^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$');
        if (!pRe.exec(phone)) {
          group.get('email').setErrors(null);
          group.get('phone').setErrors({required: true});
          return;
        }
      }
      group.get('phone').setErrors(null);
      group.get('email').setErrors(null);
    }
  }

  open(u: string) {
    this.router.navigate(['sign', u]);
  }

  ngOnInit() {
    this.signUpFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required]],
      repeatPassword: ['']
    }, {validators: this.ValidationData});
  }

}
