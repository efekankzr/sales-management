import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { CategoryService } from '../../categories/categories.service';
import { Category } from '../../categories/category.model';
import { BrandService } from '../../brands/brands.service';
import { Brand } from '../../brands/brand.model';

@Component({
  selector: 'product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers: [CategoryService, BrandService],
})
export class ProductCreateComponent implements OnInit {
  public Editor = ClassicEditor;
  categories: Category[] = [];
  brands: Brand[] = [];
  error: string = '';
  model: any = {
    name: '',
    price: 0,
    imageUrl: '',
    description: '',
    isActive: false,
    categoryId: '0',
    brandId: '0',
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
    this.brandService.getBrands().subscribe((data) => {
      this.brands = data;
    });
  }

  saveProduct(form: NgForm) {
    const extensions = ['jpeg', 'jpg', 'png'];
    const extension = this.model.imageUrl.split('.').pop();

    if (!extensions.includes(extension)) {
      this.error = 'Resim uzantısı sadece jpeg, jpg, png olmalıdır.';
      return;
    }

    if (this.model.categoryId === '0') {
      this.error = 'Kategori seçmelisiniz.';
      return;
    }

    if (this.model.brandId === '0') {
      this.error = 'Marka seçmelisiniz.';
      return;
    }

    const product = {
      ...this.model,
    };

    if (form.valid) {
      this.productService.createProduct(product).subscribe((newProduct) => {
        console.log('Yeni Ürün:', newProduct);
        this.router.navigate(['/products/list']);
      });
    } else {
      this.error = 'Formu kontrol ediniz.';
    }
  }
}
