import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterDongleComponent } from './router-dongle.component';

describe('RouterDongleComponent', () => {
  let component: RouterDongleComponent;
  let fixture: ComponentFixture<RouterDongleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouterDongleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterDongleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
