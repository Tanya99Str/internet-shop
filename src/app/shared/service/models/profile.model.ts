import {UserModel} from './user.model';
import {DeliveryModel} from './delivery.model';
import {OrderModel} from './order.model';

export class ProfileModel {
  id?: number;
  phone?: string;
  imageContentType?: string;
  image?: any;
  user?: UserModel;
  deliveries?: DeliveryModel[];
  orders?: OrderModel[];
}
