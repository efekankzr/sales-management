import { Component, OnInit } from '@angular/core';
import { AuthService } from './authentication/auth.service';
import { ProductService } from './products/product.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService],
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    // console.log(environment.production);
    // console.log(environment.adminEmail);
  }
}
