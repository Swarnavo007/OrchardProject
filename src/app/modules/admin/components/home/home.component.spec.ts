import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import {NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { HomeComponent } from './home.component';

import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],       //changes
      imports: [RouterTestingModule, MatMenuModule,MatIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    modalService = TestBed.get(NgbModal);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Modal Opened', function () {
  //   component.onModalRequest();
  //   expect(modalService.open).toHaveBeenCalled();
  //   });

  describe('Simple HTML',()=>{

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

    it('should have a icon Logout on navigation bar', ()=>{
      const linkDes=fixture.debugElement
        .queryAll(By.css('button'));
      const nativeButton: HTMLButtonElement=linkDes[6].nativeElement;
      expect(nativeButton.textContent).toBe('account_circle');
    })
  
  })

  describe('Navigation',()=>{

    //changes
  it(`after pressing 'Icy-licious' button should naviate to the analysis page`, ()=>{
    const router=TestBed.get(Router);
    spyOn(router,'navigateByUrl');
    const linkDes=fixture.debugElement
      .queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement=linkDes[0].nativeElement;
    nativeButton.click();
    expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['/analysis']),{
      skipLocationChange:false, replaceUrl:false, state:undefined
    })
  })

  it(`after pressing 'Add Product' button should naviate to the add-product page`, ()=>{
    const router=TestBed.get(Router);
    spyOn(router,'navigateByUrl');
    const linkDes=fixture.debugElement
      .queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement=linkDes[1].nativeElement;
    nativeButton.click();
    expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['/add-product']),{
      skipLocationChange:false, replaceUrl:false, state:undefined
    })
  })

  it(`after pressing 'View Product' button should naviate to the view-product page`, ()=>{
    const router=TestBed.get(Router);
    spyOn(router,'navigateByUrl');
    const linkDes=fixture.debugElement
      .queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement=linkDes[2].nativeElement;
    nativeButton.click();
    expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['/view-product']),{
      skipLocationChange:false, replaceUrl:false, state:undefined
    })
  })

  it(`after pressing 'Show Orders' button should naviate to the show-orders page`, ()=>{
    const router=TestBed.get(Router);
    spyOn(router,'navigateByUrl');
    const linkDes=fixture.debugElement
      .queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement=linkDes[3].nativeElement;
    nativeButton.click();
    expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['/orders']),{
      skipLocationChange:false, replaceUrl:false, state:undefined
    })
  })

  it(`after pressing 'Analysis' button should naviate to the analysis page`, ()=>{
    const router=TestBed.get(Router);
    spyOn(router,'navigateByUrl');
    const linkDes=fixture.debugElement
      .queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement=linkDes[4].nativeElement;
    nativeButton.click();
    expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['/analysis']),{
      skipLocationChange:false, replaceUrl:false, state:undefined
    })
  })

  it(`after pressing 'Subscribers' button should naviate to the subscribers page`, ()=>{
    const router=TestBed.get(Router);
    spyOn(router,'navigateByUrl');
    const linkDes=fixture.debugElement
      .queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement=linkDes[5].nativeElement;
    nativeButton.click();
    expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['/subscibers']),{
      skipLocationChange:false, replaceUrl:false, state:undefined
    })
  })

  })

  
});

