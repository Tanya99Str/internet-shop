import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../../config/url';
import {Observable} from 'rxjs';
import {DeliveryModel} from '../models/delivery.model';
import {createRequestOption, SearchWithPagination} from '../../utils/request-util';

type EntityResponseType = HttpResponse<DeliveryModel>;
type EntityArrayResponseType = HttpResponse<DeliveryModel[]>;

@Injectable({ providedIn: 'root' })
export class DeliveryService {
  public resourceUrl = SERVER_API_URL + 'api/deliveries';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/deliveries';

  constructor(protected http: HttpClient) {}

  create(delivery: DeliveryModel): Observable<EntityResponseType> {
    return this.http.post<DeliveryModel>(this.resourceUrl, delivery, { observe: 'response' });
  }

  update(delivery: DeliveryModel): Observable<EntityResponseType> {
    return this.http.put<DeliveryModel>(this.resourceUrl, delivery, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<DeliveryModel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<DeliveryModel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<DeliveryModel[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
