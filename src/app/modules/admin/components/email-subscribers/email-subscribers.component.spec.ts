import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { EmailSubscribersComponent } from './email-subscribers.component';

describe('EmailSubscribersComponent', () => {
  let component: EmailSubscribersComponent;
  let fixture: ComponentFixture<EmailSubscribersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailSubscribersComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSubscribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Simple Html', () => {
    it('Should have exports in h2 tag', () => {
      const linkDes = fixture.debugElement.queryAll(By.css('h2'));
      const nativeH2: HTMLHeadElement = linkDes[0].nativeElement;
      expect(nativeH2.textContent).toBe('Export');
    });
    it('Should have only one table for Email Subscribers', () => {
      const tables = fixture.debugElement.queryAll(By.css('table'));
      expect(tables.length).toBe(1);
    });
    it('Table Should have Heading as # and Email ID', () => {
      const linkDes = fixture.debugElement.queryAll(By.css('table'));
      const nativeTable: HTMLTableHeaderCellElement = linkDes[0].nativeElement;
      expect(nativeTable.textContent).toBe('#Email ID');
    });
  });
});
