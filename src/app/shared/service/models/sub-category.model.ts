import {ProductModel} from './product.model';
import {CategoryModel} from './category.model';

export class SubCategoryModel {
  id?: number;
  name?: string;
  category?: CategoryModel;
  products?: ProductModel[];
}
