//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationModule } from '../authentication/authentication.module';

//Components
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [NavbarComponent, HomeComponent, NotFoundComponent, AboutComponent],
  imports: [CommonModule, RouterModule, AuthenticationModule],
  exports: [NavbarComponent, HomeComponent],
})
export class SharedModule {}
