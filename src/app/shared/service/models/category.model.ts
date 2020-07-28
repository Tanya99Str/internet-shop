import {ProductModel} from './product.model';
import {SubCategoryModel} from './sub-category.model';

export class CategoryModel {
  id?: number;
  name?: string;
  subCategories?: SubCategoryModel[];
  products?: ProductModel[];
}
