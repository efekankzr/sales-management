import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShowroomComponent } from './product-showroom.component';

describe('ProductShowroomComponent', () => {
  let component: ProductShowroomComponent;
  let fixture: ComponentFixture<ProductShowroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductShowroomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductShowroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
