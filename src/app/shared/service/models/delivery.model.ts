import {OrderModel} from './order.model';
import {ProfileModel} from './profile.model';

export class DeliveryModel {
  id?: number;
  cityTo?: string;
  postNumber?: number;
  order?: OrderModel;
  user?: ProfileModel;
}
