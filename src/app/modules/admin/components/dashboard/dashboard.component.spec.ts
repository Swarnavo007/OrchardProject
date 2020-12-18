import { DashboardService } from './../../../../services/dashboard.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from './dashboard.component';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: DashboardService, useClass: DashboardServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should have the 21 div tags',()=>{
  //   let data=fixture.debugElement.queryAll(By.css('div'));
  //   expect(data.length).toBe(21);
  // })
  it('should have the Number of Orders container', () => {
    const dashboard = fixture.debugElement.queryAll(By.css('div'));
    const orderDivEle: HTMLDivElement = dashboard[4].nativeElement;
    expect(orderDivEle.textContent).toBe(' Number of Orders  2 ');
  });

  it('Should have the  Number of Customers container', () => {
    const dashboard = fixture.debugElement.queryAll(By.css('div'));
    const customerDivEle: HTMLDivElement = dashboard[8].nativeElement;
    expect(customerDivEle.textContent).toBe(' Number of Customers  2 ');
  });

  it('Should have the Number of Products container', () => {
    const dashboard = fixture.debugElement.queryAll(By.css('div'));
    const productDivEle: HTMLDivElement = dashboard[13].nativeElement;
    expect(productDivEle.textContent).toBe(' Number of Products  2 ');
  });

  it('Should have the Number of Email Subscribers container', () => {
    const dashboard = fixture.debugElement.queryAll(By.css('div'));
    const productDivEle: HTMLDivElement = dashboard[17].nativeElement;
    expect(productDivEle.textContent).toBe(' Number of Email Subscribers  2 ');
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});
class DashboardServiceStub {
  getProducts() {
    return of(['2']);
  }
  getOrders() {
    return of(['2']);
  }
  getEmailSubscribers() {
    return of(['2']);
  }
  getUsersCount() {
    return of(['2']);
  }
}
