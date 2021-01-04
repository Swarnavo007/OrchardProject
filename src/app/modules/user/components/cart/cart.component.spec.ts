import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
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
  describe('button clicks',()=>{
    it ('check the working of the showModel button', ()=>
  {
    expect(component.submitButton).toBe(false, 'not clicked');
    component.showModel();
    expect(component.submitButton).toBe(true, 'clicked');
  })

  it ('check the working of the closeModel button', ()=>
  {
    expect(component.submitButton).toBe(false, 'not clicked');
    component.closeModel();
    expect(component.submitButton).toBe(true, 'clicked');
  })


  it ('check the working of the hideloader button', ()=>
  {
    expect(component.submitButton).toBe(false, 'not clicked');
    component.hideloader();
    expect(component.submitButton).toBe(true, 'clicked');
  })
  // it(`after pressing 'BuyNow' button should naviate to the  Buy now! page`, ()=>{
  //   const router=TestBed.get(Router);
  //   spyOn(router,'navigateByUrl');
  //   const linkDes=fixture.debugElement
  //     .queryAll(By.css('button'));
  //   const nativeButton: HTMLButtonElement=linkDes[0].nativeElement;
  //   nativeButton.click();
  //   expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['/shop']),{
  //     skipLocationChange:false, replaceUrl:false, state:undefined
  //   })
  // })

  
  
  })


});
