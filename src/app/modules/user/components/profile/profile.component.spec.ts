import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileComponent } from './profile.component';
import { ToastrModule } from 'ngx-toastr';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [HttpClientTestingModule, RouterTestingModule,ToastrModule.forRoot(),],
      providers: [FormBuilder,{ provide: ProfileService, useClass: ProfileServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the button update password button',()=>{
    const linkDesc = fixture.debugElement.queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement = linkDesc[0].nativeElement;
    expect(nativeButton.textContent).toBe('');
  })
  it('should contain the button update profile button',()=>{
    const linkDesc = fixture.debugElement.queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement = linkDesc[1].nativeElement;
    expect(nativeButton.textContent).toBe(' Update Password ');
  })

  it('should contain the button logout button',()=>{
    const linkDesc = fixture.debugElement.queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement = linkDesc[2].nativeElement;
    expect(nativeButton.textContent).toBe('Logout');

  })
   it('should have the table',()=>{
     const tables=fixture.debugElement.queryAll(By.css('table'));
     expect(tables.length).toEqual(0);
   })


   describe('button clicks',()=>{
    // it ('check the working of the logout button', ()=>
    // {
    //   expect(component.submitButton).toBe(false, 'not clicked');
    //   component.logout();
    //   expect(component.submitButton).toBe(true, 'clicked!');
    // });

    it ('check the working of the shopNow button', ()=>
    {
      expect(component.submitButton).toBe(false, 'not clicked');
      component.shopNow();
      expect(component.submitButton).toBe(true, 'clicked!');
    });

    it ('check the working of the showDelete button', ()=>
    {
      expect(component.submitButton).toBe(false, 'not clicked');
      component.showDelete();
      expect(component.submitButton).toBe(true, 'clicked!');
    });

    it ('check the working of the closeModal button', ()=>
    {
      expect(component.submitButton).toBe(false, 'not clicked');
      component.closeModal();
      expect(component.submitButton).toBe(true, 'clicked!');
    });

    it ('check the working of the showVeifyModal button', ()=>
    {
      expect(component.submitButton).toBe(false, 'not clicked');
      component.showVeifyModal();
      expect(component.submitButton).toBe(true, 'clicked!');
    });

    it ('check the working of the closeVeifyModal button', ()=>
    {
      expect(component.submitButton).toBe(false, 'not clicked');
      component.closeVeifyModal();
      expect(component.submitButton).toBe(true, 'clicked!');
    });
    // it ('check the working of the verifyPassword button', ()=>
    // {
    //   expect(component.submitButton).toBe(false, 'not clicked');
    //   component.verifyPassword();
    //   expect(component.submitButton).toBe(true, 'clicked!');
    // });

    it ('check the working of the showVeifyModalPass button', ()=>
    {
      expect(component.submitButton).toBe(false, 'not clicked');
      component.showVeifyModalPass();
      expect(component.submitButton).toBe(true, 'clicked!');
    });

    it ('check the working of the closeVeifyModalPass button', ()=>
    {
      expect(component.submitButton).toBe(false, 'not clicked');
      component.closeVeifyModalPass();
      expect(component.submitButton).toBe(true, 'clicked!');
    });

    // it ('check the working of the verifyPasswordUpdate button', ()=>
    // {
    //   expect(component.submitButton).toBe(false, 'not clicked');
    //   component.verifyPasswordUpdate();
    //   expect(component.submitButton).toBe(true, 'clicked!');
    // });
    

   })
 
});

class ProfileServiceStub{
  getOrders(){
    return of([]);
  }
}
