import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AdminGuard } from '../authentication/admin.guard';
import { AuthenticationModule } from '../authentication/authentication.module';
import { CategoriesModule } from '../categories/categories.module';
import { BrandsModule } from '../brands/brands.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductShowroomComponent } from './product-showroom/product-showroom.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'list/create', component: ProductCreateComponent, canActivate: [AdminGuard]},
      {path: 'list/edit/:productId', component: ProductEditComponent, canActivate: [AdminGuard]},
      {path: 'list', component: ProductListComponent,canActivate: [AdminGuard]},
      { path: '', component: ProductShowroomComponent },
      { path: ':productId', component: ProductCardComponent },
      { path: 'category/:categoryId', component: ProductShowroomComponent },
    ],
  },
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductShowroomComponent,
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CKEditorModule,
    AuthenticationModule,
    RouterModule.forChild(routes),
    CategoriesModule,
    BrandsModule,
  ],
  exports: [
    ProductListComponent, 
    ProductComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductShowroomComponent,
    ProductCardComponent,
  ],
})
export class ProductsModule {}
