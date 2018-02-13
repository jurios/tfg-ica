import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentsDetailComponent } from './segments-detail.component';

describe('SegmentsDetailComponent', () => {
  let component: SegmentsDetailComponent;
  let fixture: ComponentFixture<SegmentsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
