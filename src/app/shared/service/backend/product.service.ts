import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../config/url';
import {ProductModel} from '../models/product.model';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {createRequestOption, SearchWithPagination} from '../../utils/request-util';
import {NewOrderDto} from '../models/new-order.dto';
type EntityResponseType = HttpResponse<ProductModel>;
type EntityArrayResponseType = HttpResponse<ProductModel[]>;

@Injectable({providedIn: 'root'})
export class ProductService {
  public resourceUrl = SERVER_API_URL + 'api/products';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/products';

  constructor(protected http: HttpClient) {
  }

  findAll(category?: number, sortByPrice?: string): Observable<ProductModel[]> {
    let param: HttpParams = new HttpParams();
    if (category) {
      param = param.set('category', category + '');
    }
    if (sortByPrice) {
      param = param.set('sortByPrice', sortByPrice);
    }
    return this.http.get<ProductModel[]>(this.resourceUrl,
      {params: param}).pipe(catchError(err => throwError(err)));
  }

  researcher(query: string): Observable<ProductModel[]> {
    let param: HttpParams = new HttpParams().set('query', query + '');
    return this.http.get<ProductModel[]>(SERVER_API_URL + 'api/_search/products', {params: param})
      .pipe(catchError(err => throwError(err)));
  }

  findOneProduct(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.resourceUrl}/${id}`).pipe(catchError(err => throwError(err)));
  }

  createOrder(id: number, order: NewOrderDto) {
    return this.http.post<number>(`${this.resourceUrl}/${id}/order`, order)
      .pipe(catchError(err => throwError(err)));
  }

}
