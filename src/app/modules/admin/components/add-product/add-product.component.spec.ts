import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { By } from '@angular/platform-browser';
import { AddProductService } from 'src/app/services/add-product.service';
describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
      providers:[FormBuilder,{ provide: AddProductService, useClass: AddProductServiceStub }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("testing initial state of form", ()=>{
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
 

  describe("checking for HTML elements", ()=>{

    it("checking for number of forms",()=>{
      const forms = fixture.nativeElement.querySelectorAll('form');
      expect(forms.length).toBe(1);
    })

    it("checking for number of labels and their content",()=>{
      const labels = fixture.nativeElement.querySelectorAll('label');
      expect(labels.length).toBe(9);
      expect(labels[0].textContent).toBe("Product Code");
      expect(labels[1].textContent).toBe("Product Name");
      expect(labels[2].textContent).toBe("Type");
      expect(labels[3].textContent).toBe("Price");
      expect(labels[4].textContent).toBe("Description");
      expect(labels[5].textContent).toBe("Start date");
      expect(labels[6].textContent).toBe("End date");
      expect(labels[7].textContent).toBe("Product Image");
      expect(labels[8].textContent).toBe("Upload");
    })

    it("checking for number of inputs and their types",()=>{
      const inputs = fixture.nativeElement.querySelectorAll("input");
      expect(inputs.length).toBe(6);
      expect(inputs[0].type).toBe("text");
      expect(inputs[1].type).toBe("text");
      expect(inputs[2].type).toBe("number");
      expect(inputs[3].type).toBe("date");
      expect(inputs[4].type).toBe("date");
      expect(inputs[5].type).toBe("file");
    })

    it("checking for number of text area",()=>{
      const textAreas = fixture.nativeElement.querySelectorAll("textarea");
      expect(textAreas.length).toBe(1);
    })

    it("checking for number of select tag",()=>{
      const selects = fixture.nativeElement.querySelectorAll("select");
      expect(selects.length).toBe(1);
    })
     
  
    it("checking for number of buttons",()=>{
      const btns = fixture.nativeElement.querySelectorAll("button");
      expect(btns.length).toBe(1);
      expect(btns[0].textContent).toBe(" Create ");
    })

   
    
  })

});
class AddProductServiceStub{
  create(product){

  }
}

