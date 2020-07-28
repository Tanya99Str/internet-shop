import {SERVER_API_URL} from '../../config/url';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {catchError} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(private http: HttpClient) {}

  save(account: UserModel): Observable<{}> {
    return this.http.post(SERVER_API_URL + 'api/register', account);
  }

  registrationUser(user: UserModel): Observable<number> {
    return this.http.post<number>(SERVER_API_URL + 'api/register', JSON.stringify(user)).pipe(catchError(err => throwError(err)));
  }

}
