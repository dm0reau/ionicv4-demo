import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss']
})
export class FormPage implements OnInit, OnDestroy {
  isEditForm = false;
  product: Product = {
    name: '',
    quantity: 1,
    photo: '',
    barcode: ''
  };

  private product$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private camera: Camera,
    private barcodeScanner: BarcodeScanner
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

  async saveProduct() {
    await this.productService.save(this.product);
    this.router.navigateByUrl('/home');
  }

  async takePicture() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    try {
      const photoData = await this.camera.getPicture(options);
      this.product.photo = 'data:image/jpeg;base64,' + photoData;
    } finally {
    }
  }

  async scan() {
    try {
      const barcodeData = await this.barcodeScanner.scan();
      this.product.barcode = barcodeData.text;
    } finally {
    }
  }
}
