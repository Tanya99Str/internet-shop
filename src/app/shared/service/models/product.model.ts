import {SizeModel} from './size.model';
import {CategoryModel} from './category.model';
import {SubCategoryModel} from './sub-category.model';
import {ColorModel} from './color.model';
import {CollectionModel} from './collection.model';

export class ProductModel {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  madeOf?: string;
  material?: string;
  image1ContentType?: string;
  image1?: any;
  image2ContentType?: string;
  image2?: any;
  image3ContentType?: string;
  image3?: any;
  image4ContentType?: string;
  image4?: any;
  image5ContentType?: string;
  image5?: any;
  sizes?: SizeModel[];
  categories?: CategoryModel[];
  subCategories?: SubCategoryModel[];
  colours?: ColorModel[];
  suggestedProducts?: ProductModel[];
  collection?: CollectionModel;
  suggestedFors?: ProductModel[];
}
