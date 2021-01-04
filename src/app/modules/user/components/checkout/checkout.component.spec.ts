import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      imports: [RouterTestingModule]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('checking button and added navigation',()=>{
    it(`after pressing 'profile' button should naviate to the profile page`, ()=>{
      const router=TestBed.get(Router);
      spyOn(router,'navigateByUrl');
      const linkDes=fixture.debugElement
        .queryAll(By.css('button'));
      const nativeButton: HTMLButtonElement=linkDes[0].nativeElement;
      nativeButton.click();
      expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['/profile']),{
        skipLocationChange:false, replaceUrl:false, state:undefined
      })
    })


    it(`after pressing 'shop' button should naviate to the shop page`, ()=>{
      const router=TestBed.get(Router);
      spyOn(router,'navigateByUrl');
      const linkDes=fixture.debugElement
        .queryAll(By.css('button'));
      const nativeButton: HTMLButtonElement=linkDes[1].nativeElement;
      nativeButton.click();
      expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['/shop']),{
        skipLocationChange:false, replaceUrl:false, state:undefined
      })
    })
  })
});
