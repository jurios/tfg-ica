import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentsFormComponent } from './segments-form.component';

describe('SegmentsFormComponent', () => {
  let component: SegmentsFormComponent;
  let fixture: ComponentFixture<SegmentsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
