import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CategoryService } from '../../categories/categories.service';
import { BrandService } from '../../brands/brands.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  categories: any[] = [];
  brands: any[] = [];
  error: string = '';
  loading: boolean = false;
  model: any = {
    id: '',
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    isActive: false,
    categoryId: '0',
    brandId: '0',
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Load categories and brands
    this.categoryService.getCategories().subscribe((data1) => {
      this.categories = data1;
    });
    this.brandService.getBrands().subscribe((data2) => {
      this.brands = data2;
    });

    // Fetch product details for editing
    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      this.loading = true;
      this.productService.getProductById(productId).subscribe((product) => {
        this.model = product;
        this.model.id = productId; // Ensure model has the correct id
        this.loading = false;
      });
    }
  }
}
