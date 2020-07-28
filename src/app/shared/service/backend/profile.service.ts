import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../config/url';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ProfileModel} from '../models/profile.model';
import {catchError} from 'rxjs/operators';
import {ProductModel} from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  public resourceUrl = SERVER_API_URL + 'api/profiles';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/profiles';

  constructor(protected http: HttpClient) {
  }

  updateInformation(profile: ProfileModel): Observable<number> {
    return this.http.put<number>(this.resourceUrl, profile)
      .pipe(catchError(err => throwError(err)));
  }

  findUser(id: number): Observable<ProfileModel> {
    return this.http.get<ProfileModel>(`${this.resourceUrl}/${id}`).pipe(catchError(err => throwError(err)));
  }

}
