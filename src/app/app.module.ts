//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthenticationModule } from './authentication/authentication.module';

//Components
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CategoriesModule,
    BrandsModule,
    AuthenticationModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
