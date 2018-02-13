import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapseMenuItemComponent } from './collapse-menu-item.component';

describe('CollapseMenuItemComponent', () => {
  let component: CollapseMenuItemComponent;
  let fixture: ComponentFixture<CollapseMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollapseMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapseMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
