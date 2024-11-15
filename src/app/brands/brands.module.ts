import { NgModule } from '@angular/core';
import { AdminGuard } from '../authentication/admin.guard';

//Modules
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationModule } from '../authentication/authentication.module';

//Components
import { BrandCreateComponent } from './brand-create/brand-create.component';

@NgModule({
  declarations: [BrandCreateComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AuthenticationModule,
    RouterModule.forChild([
      {
        path: 'brands/create',
        component: BrandCreateComponent,
        canActivate: [AdminGuard],
      },
    ]),
  ],
  exports: [BrandCreateComponent],
})
export class BrandsModule {}
