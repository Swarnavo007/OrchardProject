import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ViewProductsComponent } from './view-products.component';
import {ViewProductsService} from 'src/app/services/view-products.service';

describe('ViewProductsComponent', () => {
  let component: ViewProductsComponent;
  let fixture: ComponentFixture<ViewProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewProductsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [FormBuilder,{ provide: ViewProductsService, useClass: ViewProductsServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});

class ViewProductsServiceStub{
  getProducts(){
    return of([]);
  }

  createCart(product){
    return of([]);
  }
}
