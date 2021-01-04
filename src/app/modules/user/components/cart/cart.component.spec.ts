import { CartService } from 'src/app/services/cart.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { By } from '@angular/platform-browser';

import { CartComponent } from './cart.component';
import { from, of } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [RouterTestingModule, ToastrModule.forRoot()],
      providers: [{ provide: CartService, useClass: CartServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('button clicks', () => {
    it('check the working of the showModel button', () => {
      expect(component.submitButton).toBe(true, 'not clicked');
      component.showModel();
      expect(component.submitButton).toBe(false, 'clicked');
    });

    it('check the working of the closeModel button', () => {
      expect(component.submitButton).toBe(true, 'not clicked');
      component.closeModel();
      expect(component.submitButton).toBe(false, 'clicked');
    });

    it('check the working of the hideloader button', () => {
      expect(component.submitButton).toBe(true, 'not clicked');
      component.hideloader();
      expect(component.submitButton).toBe(false, 'clicked');
    });
    it(`check if place oder button is there or not`, () => {
      const linkDes = fixture.debugElement.queryAll(By.css('button'));
      const nativeButton: HTMLButtonElement = linkDes[2].nativeElement;
      expect(nativeButton.textContent).toBe(' Place Order ');
    });
  });
});
class CartServiceStub {
  getCartDetail() {
    return from([
      {
        _id: '5ff0151e1759a80017240299',
        userId: 'ayush.jaiswal47.aj@gmail.com',
        products: [
          {
            productQty: 2,
            _id: '5ff2a840b1305600179ad9a3',
            productId: 'VN101',
            productName: 'Chocolate',
          },
        ],
        __v: 17,
      },
    ]);
  }
  getImageDetail() {
    return of([
      {
        _id: '5ff2a1f8b1305600179ad9a2',
        productId: 'VN101',
        productName: 'Chocolate',
        productType: 'classic',
        productPrice: 450,
        productDescription:
          'Chocolate is made up of milk and butter.It is very famous icecream as well.',
        productStartDate: '2021-01-04T00:00:00.000Z',
        productEndDate: '2021-01-13T00:00:00.000Z',
        productImage:
          'http://sumit-icylicious-sep-20.herokuapp.com\\uploads/1609736696131.jpg',
        __v: 0,
      },
    ]);
  }
}
