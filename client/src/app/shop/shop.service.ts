import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { IType } from '../shared/models/productType';
import { IBrand } from '../shared/models/brands';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:7086/api/';
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  shopParams = new ShopParams();
  constructor(private http: HttpClient) {}

  getProducts(brandId?: number, typeId?: number, sort?: string) {
    let params = new HttpParams();
    //let shopParams = new ShopParams();

    if (this.shopParams.brandId !== 0) {
      params = params.append('brandId', brandId.toString());
    }

    if (this.shopParams.typeId !== 0) {
      params = params.append('typeId', typeId.toString());
    }

    // if (sort) {
    //   params = params.append('sort', sort);
    // }
    params = params.append('sort', sort);
    params = params.append('pageIndex', this.shopParams.pageNumber);
    params = params.append('pageIndex', this.shopParams.pageSize);

    return this.http
      .get<IPagination>(this.baseUrl + 'products', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  // getTypes() {
  //   return this.http.get<IType[]>(this.baseUrl + 'products/types');
  // }
  getTypes() {
    if (this.types.length > 0) {
      return of(this.types);
    }
    return this.http.get<IType[]>(this.baseUrl + 'products/types').pipe(
      map((response) => {
        this.types = response;
        return response;
      })
    );
  }
}
