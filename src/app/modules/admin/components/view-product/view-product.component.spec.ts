import { of } from 'rxjs';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { By } from '@angular/platform-browser';
import { ViewProductComponent } from './view-product.component';
import { ViewProductService } from 'src/app/services/view-product.service';

import * as Rx from 'rxjs';
describe('ViewProductComponent', () => {
  let component: ViewProductComponent;
  let fixture: ComponentFixture<ViewProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewProductComponent],
      imports: [
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [FormBuilder,{ provide: ViewProductService, useClass: ViewProductServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // describe('Simple HTML element for cards', ()=>{
  //   it('should have tag Empty Products',()=>{
  //     const linkDes = fixture.debugElement.queryAll(By.css('h2'));
  //     const nativeH2: HTMLHeadElement = linkDes[0].nativeElement;
  //     expect(nativeH2.textContent).toBe('Empty Products');
  //   })
  // })

  describe('button clicks',()=>{
    it ('check the working of the hide button button', ()=>
    {
      expect(component.submitButton).toBe(false, 'not clicked');
      component.hide();
      expect(component.submitButton).toBe(true, 'clicked!');
    })

    it ('check the working of the showDelete button button', ()=>
    {
      expect(component.submitButton).toBe(false, 'not clicked');
      component.showDelete();
      expect(component.submitButton).toBe(true, 'clicked!');
    })

    it ('check the working of the closeModal button button', ()=>
    {
      expect(component.submitButton).toBe(false, 'not clicked');
      component.closeModal();
      expect(component.submitButton).toBe(true, 'clicked!');
    })


  })

  describe('Simple HTML element on popup', () => {
    it('should have a "close" button on popup', () => {
      const linkDesc = fixture.debugElement.queryAll(By.css('button'));
      const nativeButton: HTMLButtonElement = linkDesc[0].nativeElement;
      expect(nativeButton.textContent).toBe('×');
    });

    it('should have a Update button on popup', () => {
      const linkDesc = fixture.debugElement.queryAll(By.css('button'));
      const nativeButton: HTMLButtonElement = linkDesc[1].nativeElement;
      expect(nativeButton.textContent).toBe(' Update ');
    });

    it('should have a Delete button on popup', () => {
      const linkDesc = fixture.debugElement.queryAll(By.css('button'));
      const nativeButton: HTMLButtonElement = linkDesc[2].nativeElement;
      expect(nativeButton.textContent).toBe(' Delete ');
    });
  });

  describe('Simple HTML Element of Confirm Box of Delete option', () => {
    it('should have a "close" button on the confirm box of Delete option', () => {
      const linkDesc = fixture.debugElement.queryAll(By.css('button'));
      const nativeButton: HTMLButtonElement = linkDesc[3].nativeElement;
      expect(nativeButton.textContent).toBe('');
    });

    it('should have a Confirm button on the confirm box of Delete option', () => {
      const linkDesc = fixture.debugElement.queryAll(By.css('button'));
      const nativeButton: HTMLButtonElement = linkDesc[4].nativeElement;
      expect(nativeButton.textContent).toBe('Confirm');
    });

    it('should have a Cancel button on the confirm box of Delete option', () => {
      const linkDesc = fixture.debugElement.queryAll(By.css('button'));
      const nativeButton: HTMLButtonElement = linkDesc[5].nativeElement;
      expect(nativeButton.textContent).toBe(' Cancel ');
    });
  });

  // it('should have a Cancel button on the confirm box of Delete option', ()=>{

  //   const linkDesc=fixture.nativeElement
  //     .querySelectorAll('button');
  //   // const nativeButton: HTMLButtonElement=linkDesc[6].nativeElement;
  //   // expect(nativeButton.textContent).toBe('Cancel');
  //   console.log(linkDesc.length)

  // })
});

class ViewProductServiceStub{
  getProducts(){
    return of([]);
  }
}