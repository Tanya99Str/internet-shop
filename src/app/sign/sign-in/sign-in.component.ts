import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Login} from '../../shared/service/models/login.model';
import {LoginService} from '../../shared/service/backend/login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInFormGroup: FormGroup;
  hide = true;
  user: Login = new Login();

  constructor(private _formBuilder: FormBuilder, public router: Router,
              private _loginService: LoginService) { }

  ngOnInit() {
    this.signInFormGroup = this._formBuilder.group({
      password: ['', [Validators.required]],
      username: ['', [Validators.required]]
    });
  }

  login(): void {
    this.user.username = this.signInFormGroup.get('username').value;
    this.user.password = this.signInFormGroup.get('password').value;
    this.user.rememberMe = false;
    console.log(this.user);
    this._loginService.login(this.user).subscribe(next => {
      console.log(next);
      this.router.navigate(['']);
    }, error => {
      console.error(error);
    });
  }

  open(u: string) {
    this.router.navigate(['sign', u]);
  }

}
