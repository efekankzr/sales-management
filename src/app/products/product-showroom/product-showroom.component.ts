import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'product-showroom',
  templateUrl: './product-showroom.component.html',
  styleUrls: ['./product-showroom.component.css'],
  providers: [ProductService],
})
export class ProductShowroomComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.loading = true;

      this.productService
        .getProductsIsActive(params['categoryId'])
        .subscribe((data) => {
          this.products = data;
          this.loading = false;
        });
    });
  }
}
