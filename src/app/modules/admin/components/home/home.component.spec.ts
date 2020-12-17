import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import {Location} from '@angular/common';
import { HomeComponent } from './home.component';
import { Component } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent,DummyComponent],       //changes
      imports: [RouterTestingModule.withRoutes([{
        path:'analysis',component:DummyComponent          //chnages
      }]), MatMenuModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a button Icy-Lycious on the navigation bar', ()=>{
    
    const linkDes=fixture.debugElement
      .queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement=linkDes[0].nativeElement;
    expect(nativeButton.textContent).toBe('Icy-Licious');
    
  })

  it('should have a button Add Product on the navigation bar', ()=>{
    const linkDes=fixture.debugElement
      .queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement=linkDes[1].nativeElement;
    expect(nativeButton.textContent).toBe('Add Products');
  })

  it('should have a button View Product on the navigation bar', ()=>{
    const linkDes=fixture.debugElement
      .queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement=linkDes[2].nativeElement;
    expect(nativeButton.textContent).toBe('View Products');
  })

  it('should have a button Show Orders on the navigation bar', ()=>{
    const linkDes=fixture.debugElement
      .queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement=linkDes[3].nativeElement;
    expect(nativeButton.textContent).toBe('Show Orders');
  })

  it('should have a button Dashboard on the navigation bar', ()=>{
    const linkDes=fixture.debugElement
      .queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement=linkDes[4].nativeElement;
    expect(nativeButton.textContent).toBe('Dashboard');
  })

  it('should have a button Subscribers on the navigation bar', ()=>{
    const linkDes=fixture.debugElement
      .queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement=linkDes[5].nativeElement;
    expect(nativeButton.textContent).toBe('Subscribers');
  })


  //changes
  it('after pressing Icy-licious button should naviate to the analysis page',async ()=>{
    const location=TestBed.get(Location);
    const linkDes=fixture.debugElement
      .queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement=linkDes[0].nativeElement;
    nativeButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      expect(location.path()).toBe('/analysis');
    })
  })
});

@Component({template:''})
class DummyComponent{}