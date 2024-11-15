import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Brand } from './brand.model';
import { map, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BrandService {
  private url = environment.database_url;

  constructor(private http: HttpClient) {}

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.url + 'brands.json').pipe(
      map((data) => {
        const brands: Brand[] = [];

        for (const key in data) {
          brands.push({ ...data[key], id: key });
        }

        return brands;
      })
    );
  }
  

  createBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(this.url + 'brands.json', brand);
  }
}
