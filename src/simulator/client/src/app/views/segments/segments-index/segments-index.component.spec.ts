import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentsIndexComponent } from './segments-index.component';

describe('SegmentsIndexComponent', () => {
  let component: SegmentsIndexComponent;
  let fixture: ComponentFixture<SegmentsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
