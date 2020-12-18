import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { By } from '@angular/platform-browser';
import { OrdersComponent } from './orders.component';
import { Router } from '@angular/router';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Simple HTML', () => {
    it('should have a button to close order details', () => {
      const linkDes = fixture.debugElement.queryAll(By.css('button'));
      const nativeButton: HTMLButtonElement = linkDes[0].nativeElement;
      expect(nativeButton.textContent).toBe(' Close ');
    });
    it('should have a button to close the order details pop up', () => {
      const linkDes = fixture.debugElement.queryAll(By.css('button'));
      const nativeButton: HTMLButtonElement = linkDes[1].nativeElement;
      expect(nativeButton.textContent).toBe('');
    });

    it('should have a button to confirm the order status', () => {
      const linkDes = fixture.debugElement.queryAll(By.css('button'));
      const nativeButton: HTMLButtonElement = linkDes[2].nativeElement;
      expect(nativeButton.textContent).toBe(' Confirm ');
    });

    it('should have a button to cancel to set order status', () => {
      const linkDes = fixture.debugElement.queryAll(By.css('button'));
      const nativeButton: HTMLButtonElement = linkDes[3].nativeElement;
      expect(nativeButton.textContent).toBe('Cancel');
    });

    it('Should have two table for order details', () => {
      const tables = fixture.debugElement.queryAll(By.css('table'));
      expect(tables.length).toBe(3);
    });

    it('Table Should have Headings Order Id , User Id , Order Date, Total Price', () => {
      const tableRows = fixture.nativeElement.querySelectorAll('tr');
      let headerRow = tableRows[0];
      expect(headerRow.cells[0].textContent).toBe('Order Id');
      expect(headerRow.cells[1].textContent).toBe('User Id');
      expect(headerRow.cells[2].textContent).toBe('Order Date');
      expect(headerRow.cells[3].textContent).toBe('Total Price');
    });
  });

  describe('Navigation', () => {
    // it(`after pressing 'Confirm' button should naviate to the analysis page`, ()=>{
    //   const router=TestBed.get(Router);
    //   spyOn(router,'navigateByUrl');
    //   const linkDes=fixture.debugElement
    //     .queryAll(By.css('button'));
    //   const nativeButton: HTMLButtonElement=linkDes[2].nativeElement;
    //   nativeButton.click();
    //   expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['/dashboard/analysis']),{
    //     skipLocationChange:false, replaceUrl:false, state:undefined
    //   })
    // })
  });
});
