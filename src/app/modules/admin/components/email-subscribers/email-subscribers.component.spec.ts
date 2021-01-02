import { SubscribersService } from './../../../../services/subscribers.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { EmailSubscribersComponent } from './email-subscribers.component';
import { of } from 'rxjs';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EmailSubscribersComponent', () => {
  let component: EmailSubscribersComponent;
  let fixture: ComponentFixture<EmailSubscribersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailSubscribersComponent],
      imports: [RouterTestingModule],
      // imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: SubscribersService, useClass: EmailServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSubscribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it ('check the working of the button', ()=>
  // {
  //   expect(component.submitButton).toBe(false, 'not yet clicked');
  //   component.exportexcel();
  //   expect(component.submitButton).toBe(true, 'clicked!');
  // })
  describe('Simple Html', () => {
    it('Should have exports in h2 tag', () => {
      const nativeH2 = fixture.nativeElement.querySelectorAll('h2');
      expect(nativeH2[0].textContent).toBe('Export');
    });
    it('Should have only one table for Email Subscribers', () => {
      const tables = fixture.nativeElement.querySelectorAll('table');
      expect(tables.length).toBe(1);
    });
    it('Table Should have Heading as # and Email ID', () => {
      const tableRows = fixture.nativeElement.querySelectorAll('tr');
      let headerRow = tableRows[0];
      expect(headerRow.cells[0].textContent).toBe('#');
      expect(headerRow.cells[1].textContent).toBe('Email ID');
    });
  });
});

class EmailServiceStub {
  getSubscibers() {
    return of([{ email: 'ayush@mindtree.com' }]);
  }
}
