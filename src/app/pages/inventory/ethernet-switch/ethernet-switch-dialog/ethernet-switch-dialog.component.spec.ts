import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EthernetSwitchDialogComponent } from './ethernet-switch-dialog.component';

describe('EthernetSwitchDialogComponent', () => {
  let component: EthernetSwitchDialogComponent;
  let fixture: ComponentFixture<EthernetSwitchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EthernetSwitchDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EthernetSwitchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
