import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CctvDialogComponent } from './cctv-dialog.component';

describe('UpsDialogComponent', () => {
  let component: CctvDialogComponent;
  let fixture: ComponentFixture<CctvDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CctvDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CctvDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
