import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePhoneDialogComponent } from './mobile-phone-dialog.component';

describe('MobilePhoneDialogComponent', () => {
  let component: MobilePhoneDialogComponent;
  let fixture: ComponentFixture<MobilePhoneDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobilePhoneDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilePhoneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
