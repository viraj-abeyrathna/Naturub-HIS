import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DvrDialogComponent } from './dvr-dialog.component';

describe('DvrDialogComponent', () => {
  let component: DvrDialogComponent;
  let fixture: ComponentFixture<DvrDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DvrDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DvrDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
