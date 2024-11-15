import { Component, OnInit } from '@angular/core';
import { BrandService } from '../brands.service';
import { Router } from '@angular/router';

@Component({
  selector: 'brand-create',
  templateUrl: './brand-create.component.html',
  styleUrl: './brand-create.component.css',
  providers: [BrandService],
})
export class BrandCreateComponent implements OnInit {
  constructor(
    private brandService: BrandService, 
    private router: Router
  ) {}

  ngOnInit(): void {}

  saveBrand(name: any) {
    this.brandService
      .createBrand({ id: 0, name: name.value })
      .subscribe((data) => {
        this.router.navigate(['/products/list']);
      });
  }
}
