import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss']
})
export class FormPage implements OnInit, OnDestroy {
  isEditForm = false;
  product: Product;

  private product$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.isEditForm = id !== undefined ? true : false;
    if (this.isEditForm) {
      this.product$ = this.productService.get(id).subscribe(product => {
        this.product = product;
      });
    }
  }

  ngOnDestroy() {
    if (this.product$) {
      this.product$.unsubscribe();
    }
  }
}
