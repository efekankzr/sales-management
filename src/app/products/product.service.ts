import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap, delay, take, exhaustMap, forkJoin } from 'rxjs';
import { environment } from '../../environments/environment';

import { AuthService } from '../authentication/auth.service';
import { BrandService } from '../brands/brands.service';

import { Product } from './product.model';
import { Brand } from '../brands/brand.model';
import { CategoryService } from '../categories/categories.service';

@Injectable()
export class ProductService {
  private url = environment.database_url;

  constructor(
    private http: HttpClient, 
    private authService: AuthService, 
    private brandService: BrandService,
    private categoryService: CategoryService,
  ) {}

  getProducts(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + 'products.json').pipe(
      map((data) => {
        const products: Product[] = [];
        for (const key in data) {
          if (categoryId) {
            if (categoryId == data[key].categoryId) {
              products.push({ ...data[key], id: key });
            }
          } else {
            products.push({ ...data[key], id: key });
          }
        }
        return products;
      }),
      tap((data) => console.log(data)),
      delay(1000)
    );
  }

  getBrands(): Observable<Brand[]> {
    return this.brandService.getBrands();
  }

  getProductsWithBrandAndCategoryNames(categoryId: number): Observable<Product[]> {
    return forkJoin({
      products: this.getProducts(categoryId),
      brands: this.getBrands(),
      categories: this.categoryService.getCategories()
    }).pipe(
      map(({ products, brands, categories }) => {
        return products.map((product) => {
          const brand = brands.find((b) => b.id === product.brandId);
          const category = categories.find((c) => c.id === product.categoryId);
          return {
            ...product,
            brandName: brand ? brand.name : null,
            categoryName: category ? category.name : null
          };
        });
      }),
      tap((data) => console.log(data)),
      delay(1000)
    );
  }

  getProductsIsActive(categoryId: number): Observable<Product[]> {
    return forkJoin({
      products: this.getProducts(categoryId),
      brands: this.getBrands(),
      categories: this.categoryService.getCategories(),
    }).pipe(
      map(({ products, brands, categories }) => {
        return products
          .filter((product) => product.isActive)
          .map((product) => {
            const brand = brands.find((b) => b.id === product.brandId);
            const category = categories.find((c) => c.id === product.categoryId);
            return {
              ...product,
              brandName: brand ? brand.name : null,
              categoryName: category ? category.name : null,
            };
          });
      }),
      tap((data) => console.log(data)),
      delay(1000)
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http
      .get<Product>(this.url + 'products/' + id + '.json')
      .pipe(delay(1000));
  }

  createProduct(product: Product): Observable<Product> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.post<{ name: string }>(
          `${this.url}products.json?auth=${user?.token}`,
          product
        ).pipe(
          map((responseData) => {
            return { ...product, id: responseData.name };
          })
        );
      })
    );
  }

  updateProduct(product: Product): Observable<void> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const url = `${this.url}products/${product.id}.json?auth=${user?.token}`;
        return this.http.put<void>(url, product);
      })
    );
  }

  deleteProduct(productId: string): Observable<void> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const url = `${this.url}products/${productId}.json?auth=${user?.token}`;
        return this.http.delete<void>(url);
      })
    );
  }
}
