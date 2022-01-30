import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessPointDialogComponent } from './access-point-dialog.component';

describe('AccessPointDialogComponent', () => {
  let component: AccessPointDialogComponent;
  let fixture: ComponentFixture<AccessPointDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessPointDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessPointDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
