import {SizeModel} from './size.model';
import {ProductModel} from './product.model';
import {CollectionModel} from './collection.model';
import {DeliveryModel} from './delivery.model';
import {ProfileModel} from './profile.model';
import * as moment from "moment";
import {Moment} from 'moment';

export class OrderModel {
  id?: number;
  totalPrice?: number;
  date?: Moment;
  product?: ProductModel;
  size?: SizeModel;
  colour?: CollectionModel;
  delivery?: DeliveryModel;
  user?: ProfileModel;
}
