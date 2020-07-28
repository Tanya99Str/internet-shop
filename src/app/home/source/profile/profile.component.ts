import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {color} from '../../../shared/config/export.function';
import {AccountService} from '../../../shared/service/backend/account.service';
import {AccountModel} from '../../../shared/service/models/account.model';
import {ProfileService} from '../../../shared/service/backend/profile.service';
import {ProfileModel} from '../../../shared/service/models/profile.model';
import {UserService} from '../../../shared/service/backend/user.service';
import {ChangePasswordModel} from '../../../shared/service/models/change-password.model';
import {Observable, Observer} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  hideOldPass = true;
  hideNewPass = true;
  hideRepNewPass = true;

  changePass: FormGroup;
  baseInfoFormGroup: FormGroup;
  user: AccountModel;
  userProfile: ProfileModel;
  userOld: AccountModel;
  userUpdateDto: AccountModel = new AccountModel();
  profileUpdateDto: ProfileModel = new ProfileModel();
  newPassword: ChangePasswordModel = new ChangePasswordModel();
  newPhotoFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _accountService: AccountService,
              private _profileService: ProfileService,
              private _userService: UserService,
              private _snackBar: MatSnackBar,
              protected elementRef: ElementRef) {
    this.init();
    this.userOld = Object.assign({}, this.user);
  }

  updatePassword() {
    this.newPassword.currentPassword = this.changePass.get('oldPass').value;
    this.newPassword.newPassword = this.changePass.get('newPass').value;
    this._accountService.changePasswordProfile(this.newPassword).subscribe(next => {
      this.info('Пароль оновленно');
      this.reloadPage();
    }, error => {
      this.info('Bибачте, сталась невідома помилка. Будь ласка, спробуйте пізніше');
      console.error(error);
    });
  }

  updateUserInformation() {
    this.userUpdateDto.id = this.user.id;
    this.userUpdateDto.firstName = this.user.firstName;
    this.userUpdateDto.lastName = this.user.lastName;
    this.userUpdateDto.email = this.user.email;
    this.userUpdateDto.login = this.user.login;
    this.userUpdateDto.phone = this.user.phone;
    this.userUpdateDto.image = this.newPhotoFormGroup.get('image').value;
    this.userUpdateDto.imageContentType = this.newPhotoFormGroup.get('imageContentType').value;
    this._userService.updateUser(this.userUpdateDto).subscribe(next => {
      this.info('Дані оновленно');
      this.userOld = Object.assign({}, this.user);
      // this.reloadPage();
    }, error => {
      console.error(error);
    });
  }

  // updatePhoto() {
  //   this.profileUpdateDto.id = this.user.id;
  //   this.profileUpdateDto.image = this.newPhotoFormGroup.get('image').value;
  //   this.profileUpdateDto.imageContentType = this.newPhotoFormGroup.get('imageContentType').value;
  //   this._userService.updateUser(this.userUpdateDto).subscribe(next => {
  //     this.info('Фото оновленно');
  //     this.userOld = Object.assign({}, this.user);
  //     this.reloadPage();
  //   }, error => {
  //     console.error(error);
  //   });
  //
  // }

  reloadPage() {
    window.location.reload();
  }

  reset() {
    this.user = Object.assign({}, this.userOld);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.loadFileToForm(event, this.newPhotoFormGroup, field, isImage).subscribe(null, (err: Error) => {
      console.log(err);
    });
  }

  loadFileToForm(event: Event, editForm: FormGroup, field: string, isImage: boolean): Observable<void> {
    return new Observable((observer: Observer<void>) => {
      const eventTarget: HTMLInputElement = event.target as HTMLInputElement;
      if (eventTarget.files && eventTarget.files[0]) {
        const file: File = eventTarget.files[0];
        if (isImage && !file.type.startsWith('image/')) {
          observer.error(Error('file is not loaded'));
        } else {
          const fieldContentType: string = field + 'ContentType';
          this.toBase64(file, (base64Data: string) => {
            console.log(base64Data);
            console.log(editForm);
            console.log(file.type);
            editForm.patchValue({
              [field]: base64Data,
              [fieldContentType]: file.type
            });
            observer.next();
            observer.complete();
          });
        }
      } else {
        observer.error(Error('file is not loaded'));
      }
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    console.log(this.newPhotoFormGroup.get('image').value);
    console.log(this.newPhotoFormGroup.get('imageContentType').value);
    this.newPhotoFormGroup.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  deleteImage() {
    this.userProfile.image = '';
    this.userProfile.imageContentType = '';
  }

  toBase64(file: File, cb: Function): void {
    const fileReader: FileReader = new FileReader();
    fileReader.onload = function (e: any) {
      const base64Data: string = e.target.result.substr(e.target.result.indexOf('base64,') + 'base64,'.length);
      cb(base64Data);
    };
    fileReader.readAsDataURL(file);
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('newPass').value;
    let repeatPassword = group.get('repeatNewPass').value;
    if (!repeatPassword) {
      group.get('repeatNewPass').setErrors({required: true});
      return;
    } else {
      group.get('repeatNewPass').setErrors(null);
    }
    if (pass !== repeatPassword) {
      group.get('repeatNewPass').setErrors({notSame: true});
    } else {
      group.get('repeatNewPass').setErrors(null);
    }
  }

  init() {
    this._accountService.fetch().subscribe(next => {
      this.user = next;
      this._profileService.findUser(this.user.id).subscribe(value => {
        this.userProfile = value;
      }, error => {
        console.error(error);
      });
    }, error => {
      console.error(error);
    });

  }

  ngOnInit() {
    this.changePass = this._formBuilder.group({
      oldPass: ['', Validators.required],
      newPass: ['', Validators.required],
      repeatNewPass: ['']
    }, {validators: this.checkPasswords});
    this.baseInfoFormGroup = this._formBuilder.group({
      name: new FormControl(),
      lastName: new FormControl(),
      middleName: new FormControl(),
      city: new FormControl(),
      birthday: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      postOffice: new FormControl()
    });
    this.newPhotoFormGroup = this._formBuilder.group({
      image: [''],
      imageContentType: ['']
    });
  }

  info(message: string) {
    this._snackBar.open(message, 'ок', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      announcementMessage: message,
      politeness: 'polite',
      direction: 'ltr'
    });
  }


  color(i) {
    return color(i);
  }

}
