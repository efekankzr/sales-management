import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../brands/brands.service';
import { CategoryService } from '../../categories/categories.service';
import { ProductService } from '../product.service';
import { NgForm } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  providers: [BrandService, CategoryService],
})
export class ProductEditComponent implements OnInit {
  public Editor = ClassicEditor;
  categories: any[] = [];
  brands: any[] = [];
  error: string = '';
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
    private router: Router
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
      this.productService.getProductById(productId).subscribe((product) => {
        this.model = product;
        this.model.id = productId; // Ensure model has the correct id
      });
    }
  }

  saveProduct(form: NgForm) {
    if (this.model.categoryId === '0') {
      this.error = 'Ürünün Kategorisini Seçmelisiniz.';
      return;
    }

    if (this.model.brandId === '0') {
      this.error = 'Ürünün Markasını Seçmelisiniz.';
      return;
    }

    if (form.valid) {
      this.productService.updateProduct(this.model).subscribe(() => {
        this.router.navigate(['/products/list']);
      });
    } else {
      this.error = 'Formu Kontrol Ediniz.';
    }
  }
}
