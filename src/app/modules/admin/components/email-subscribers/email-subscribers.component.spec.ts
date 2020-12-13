import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSubscribersComponent } from './email-subscribers.component';

describe('EmailSubscribersComponent', () => {
  let component: EmailSubscribersComponent;
  let fixture: ComponentFixture<EmailSubscribersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailSubscribersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSubscribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
