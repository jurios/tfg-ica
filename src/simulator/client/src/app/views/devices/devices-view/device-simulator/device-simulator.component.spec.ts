import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSimulatorComponent } from './device-simulator.component';

describe('DeviceSimulatorComponent', () => {
  let component: DeviceSimulatorComponent;
  let fixture: ComponentFixture<DeviceSimulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceSimulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
