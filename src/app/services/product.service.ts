import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  get(id: number): Observable<Product> {
    return this.http.get<Product>('products/' + id);
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>('products');
  }

  async save(product: Product) {
    if (product.id) {
      this.http.put(`products/${product.id}`, product).toPromise();
    } else {
      this.http.post('products', product).toPromise();
    }
  }
}
