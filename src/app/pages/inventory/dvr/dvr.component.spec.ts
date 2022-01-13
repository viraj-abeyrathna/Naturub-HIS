import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DvrComponent } from './dvr.component';

describe('DvrComponent', () => {
  let component: DvrComponent;
  let fixture: ComponentFixture<DvrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DvrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DvrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
