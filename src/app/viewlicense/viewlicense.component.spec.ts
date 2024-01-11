import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlicenseComponent } from './viewlicense.component';

describe('ViewlicenseComponent', () => {
  let component: ViewlicenseComponent;
  let fixture: ComponentFixture<ViewlicenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewlicenseComponent]
    });
    fixture = TestBed.createComponent(ViewlicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
