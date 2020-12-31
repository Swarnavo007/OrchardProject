import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        MatMenuModule,
      ],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('button clicks',()=>{
    it ('check the working of the onChange button', ()=>
    {
      expect(component.submittButton).toBe(false, 'not clicked');
      component.onChange();
      expect(component.submittButton).toBe(true, 'clicked!');
    });

    it ('check the working of the onSubmit button', ()=>
    {
      expect(component.submittButton).toBe(false, 'not clicked');
      component.onSubmit();
      expect(component.submittButton).toBe(true, 'clicked!');
    });

    it ('check the working of the showLogin button', ()=>
    {
      expect(component.submittButton).toBe(false, 'not clicked');
      component.showLogin();
      expect(component.submittButton).toBe(true, 'clicked!');
    });

    it ('check the working of the hide button', ()=>
    {
      expect(component.submittButton).toBe(false, 'not clicked');
      component.hide();
      expect(component.submittButton).toBe(true, 'clicked!');
    });


    it ('check the working of the showDelete button', ()=>
    {
      expect(component.submittButton).toBe(false, 'not clicked');
      component.showDelete();
      expect(component.submittButton).toBe(true, 'clicked!');
    });


    it ('check the working of the closeModal button', ()=>
    {
      expect(component.submittButton).toBe(false, 'not clicked');
      component.closeModal();
      expect(component.submittButton).toBe(true, 'clicked!');
    });




  })
});
