import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [RouterTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`after pressing 'Shop' button should naviate to the  Shop now! page`, ()=>{
    const router=TestBed.get(Router);
    spyOn(router,'navigateByUrl');
    const linkDes=fixture.debugElement
      .queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement=linkDes[0].nativeElement;
    nativeButton.click();
    expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['/shop']),{
      skipLocationChange:false, replaceUrl:false, state:undefined
    })
  })

  it(`after pressing 'BuyNow' button should naviate to the  Buy now! page`, ()=>{
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
});
