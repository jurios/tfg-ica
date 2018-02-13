import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentSimulatorComponent } from './segment-simulator.component';

describe('SegmentSimulatorComponent', () => {
  let component: SegmentSimulatorComponent;
  let fixture: ComponentFixture<SegmentSimulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentSimulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
