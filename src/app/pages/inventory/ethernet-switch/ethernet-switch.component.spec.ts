import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EthernetSwitchComponent } from './ethernet-switch.component';

describe('EthernetSwitchComponent', () => {
  let component: EthernetSwitchComponent;
  let fixture: ComponentFixture<EthernetSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EthernetSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EthernetSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
