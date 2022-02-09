import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCardDialogComponent } from './job-card-dialog.component';

describe('JobCardDialogComponent', () => {
  let component: JobCardDialogComponent;
  let fixture: ComponentFixture<JobCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobCardDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
