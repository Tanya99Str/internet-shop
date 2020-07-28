import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../config/url';
import {Observable, throwError} from 'rxjs';
import {CategoryModel} from '../models/category.model';
import {catchError} from 'rxjs/operators';
import {createRequestOption} from '../../utils/request-util';

type EntityResponseType = HttpResponse<CategoryModel>;
type EntityArrayResponseType = HttpResponse<CategoryModel[]>;

@Injectable({ providedIn: 'root' })
export class CategoryService {
  public resourceUrl = SERVER_API_URL + 'api/categories';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/categories';

  constructor(protected http: HttpClient) {
  }

  findAll(): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(SERVER_API_URL + 'api/categories')
      .pipe(catchError(err => throwError(err)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<CategoryModel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

}
