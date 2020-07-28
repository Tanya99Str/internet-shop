import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../../config/url';
import {Observable} from 'rxjs';
import {OrderModel} from '../models/order.model';
import {map} from 'rxjs/operators';
import {createRequestOption, SearchWithPagination} from '../../utils/request-util';
import * as moment from "moment";

type EntityResponseType = HttpResponse<OrderModel>;
type EntityArrayResponseType = HttpResponse<OrderModel[]>;

@Injectable({ providedIn: 'root' })
export class OrderService {
  public resourceUrl = SERVER_API_URL + 'api/orders';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/orders';

  constructor(protected http: HttpClient) {}

  create(order: OrderModel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(order);
    return this.http
      .post<OrderModel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(order: OrderModel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(order);
    return this.http
      .put<OrderModel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<OrderModel>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<OrderModel[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<OrderModel[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(order: OrderModel): OrderModel {
    const copy: OrderModel = Object.assign({}, order, {
      date: order.date && order.date.isValid() ? order.date.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((order: OrderModel) => {
        order.date = order.date ? moment(order.date) : undefined;
      });
    }
    return res;
  }
}
