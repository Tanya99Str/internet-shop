import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../config/url';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ProductModel} from '../models/product.model';
import {catchError} from 'rxjs/operators';
import {OrderModel} from '../models/order.model';
import {OrdersModel} from '../models/orders.model';

@Injectable({providedIn: 'root'})
export class OrdersService {
  public resourceUrl = SERVER_API_URL + '/account/orders';

  constructor(protected http: HttpClient) {
  }

  findAll(): Observable<OrdersModel[]> {
    return this.http.get<OrdersModel[]>(SERVER_API_URL + 'api/account/orders').pipe(catchError(err => throwError(err)));
  }

}
