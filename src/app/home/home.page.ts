import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products$ = this.productService.getAll();
  }
}
