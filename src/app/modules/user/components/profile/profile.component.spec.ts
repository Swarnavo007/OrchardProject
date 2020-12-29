import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
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
    expect(nativeButton.textContent).toBe(' Update Password ');
  })
  it('should contain the button update profile button',()=>{
    const linkDesc = fixture.debugElement.queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement = linkDesc[1].nativeElement;
    expect(nativeButton.textContent).toBe(' Update Profile ');
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
  
});
