import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsDialogComponent } from './ups-dialog.component';

describe('UpsDialogComponent', () => {
  let component: UpsDialogComponent;
  let fixture: ComponentFixture<UpsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
