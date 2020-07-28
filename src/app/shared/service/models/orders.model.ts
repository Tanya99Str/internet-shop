import {ProductModel} from './product.model';
import {SizeModel} from './size.model';
import {ColorModel} from './color.model';
import {DeliveryModel} from './delivery.model';
import {ProfileModel} from './profile.model';

export class OrdersModel {
  id: number;
  totalPrice: number;
  date: string;
  product: ProductModel;
  size: SizeModel;
  colour: ColorModel;
  delivery: DeliveryModel;
  user: ProfileModel;
}
