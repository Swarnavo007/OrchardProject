import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('button clicks',()=>{
    it ('check the working of the submitButton button', ()=>
    {
      expect(component.submitButton).toBe(false, 'not clicked');
      component.subscribe();
      expect(component.submitButton).toBe(true, 'clicked!');
    });

    it ('check the working of the idcheck button', ()=>
    {
      expect(component.submitButton).toBe(false, 'not clicked');
      component.idCheck();
      expect(component.submitButton).toBe(true, 'clicked!');
    });

    it ('check the working of the showView button', ()=>
    {
      expect(component.submitButton).toBe(false, 'not clicked');
      component.showView();
      expect(component.submitButton).toBe(true, 'clicked!');
    });

    it ('check the working of the closeModal button', ()=>
    {
      expect(component.submitButton).toBe(false, 'not clicked');
      component.closeModal();
      expect(component.submitButton).toBe(true, 'clicked!');
    });

    it ('check the working of the showViewSubs button', ()=>
    {
      expect(component.submitButton).toBe(false, 'not clicked');
      component.showViewSubs();
      expect(component.submitButton).toBe(true, 'clicked!');
    });
     
  })
});
