import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../config/url';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {AccountModel} from '../models/account.model';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

type EntityResponseType = HttpResponse<AccountModel>;

@Injectable({ providedIn: 'root' })
export class UserService {
  public resourceUrl = SERVER_API_URL + 'api/account';

  constructor(protected http: HttpClient) {
  }


  updateUser(user: AccountModel): Observable<number> {
    return this.http.post<number>(this.resourceUrl, user)
      .pipe(catchError(err => throwError(err)));

  }

  // update(user: AccountModel): Observable<EntityResponseType> {
  //   return this.http.put<AccountModel>(this.resourceUrl, user, { observe: 'response' });
  // }


}
