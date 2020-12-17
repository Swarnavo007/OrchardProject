import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { By } from '@angular/platform-browser';
describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ],
      providers:[FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe("form testing", ()=>{
    it("initially form should not be valid",()=>{
      expect(component.createForm.valid).toBeFalsy();
    })

    it("initially productId field should be invalid",()=>{
      const productId = component.createForm.controls['productId']
      expect(productId.valid).toBeFalsy();
    })

    it("initially productName field should be invalid",()=>{
      const productName = component.createForm.controls['productName']
      expect(productName.valid).toBeFalsy();
    })

    it("initially type field should be invalid",()=>{
      const type = component.createForm.controls['type']
      expect(type.valid).toBeFalsy();
    })

    it("initially price field should be invalid",()=>{
      const price = component.createForm.controls['price']
      expect(price.valid).toBeFalsy();
    })

    it("initially description field should be invalid",()=>{
      const description = component.createForm.controls['description']
      expect(description.valid).toBeFalsy();
    })

    it("initially startDate field should be invalid",()=>{
      const startDate = component.createForm.controls['startDate']
      expect(startDate.valid).toBeFalsy();
    })

    it("initially endDate field should be invalid",()=>{
      const endDate = component.createForm.controls['endDate']
      expect(endDate.valid).toBeFalsy();
    })    

  })



  // describe("checking that only one form is present", ()=>{
  //   const forms = fixture.nativeElement.querySelectorAll('form');
  //   expect(forms.length).toBe(1);
  // })

});
