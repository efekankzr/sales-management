import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService],
})
export class ProductListComponent implements OnInit {
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
        .getProductsWithBrandAndCategoryNames(params['categoryId'])
        .subscribe((data) => {
          this.products = data;
          this.loading = false;
        });
    });
  }

  deleteProduct(productId: string): void {
    if (confirm('Emin misiniz? Bu işlem geri alınamaz!')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter((product) => product.id !== productId);
          alert('Ürün başarıyla silindi!');
        },
        error: (error) => {
          console.error('Silme işlemi sırasında hata oluştu', error);
          alert('Bir hata oluştu, lütfen tekrar deneyin.');
        }
      });
    }
  }
}
