import { NgModule } from '@angular/core';
import { CategoryListComponent } from './category-list/category-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationModule } from '../authentication/authentication.module';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { AdminGuard } from '../authentication/admin.guard';

@NgModule({
  declarations: [CategoryListComponent, CategoryCreateComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AuthenticationModule,
    RouterModule.forChild([
      {
        path: 'categories/create',
        component: CategoryCreateComponent,
        canActivate: [AdminGuard],
      },
    ]),
  ],
  exports: [CategoryListComponent, CategoryCreateComponent],
})
export class CategoriesModule {}