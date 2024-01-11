import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlicenseUserComponent } from './viewlicense-user.component';

describe('ViewlicenseUserComponent', () => {
  let component: ViewlicenseUserComponent;
  let fixture: ComponentFixture<ViewlicenseUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewlicenseUserComponent]
    });
    fixture = TestBed.createComponent(ViewlicenseUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
