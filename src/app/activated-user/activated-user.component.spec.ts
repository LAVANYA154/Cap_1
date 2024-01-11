import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedUserComponent } from './activated-user.component';

describe('ActivatedUserComponent', () => {
  let component: ActivatedUserComponent;
  let fixture: ComponentFixture<ActivatedUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivatedUserComponent]
    });
    fixture = TestBed.createComponent(ActivatedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
