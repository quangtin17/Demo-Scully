import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
  name: string;
  id: string;
  price: number;
  image: string;
  url: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>('https://api.npoint.io/e5f45663abedabd5ab87');
  }

  getProductById(id: string): Observable<Product | null> {
    return this.getProducts()
      .pipe(map(products => {
        const filtered = products.filter(x => x.id === id);

        if (filtered.length > 0) {
          return filtered[0];
        }

        return null;
      }));
  }
}
