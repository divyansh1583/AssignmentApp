import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupMaterialComponent } from './signup-material.component';

describe('SignupMaterialComponent', () => {
  let component: SignupMaterialComponent;
  let fixture: ComponentFixture<SignupMaterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupMaterialComponent]
    });
    fixture = TestBed.createComponent(SignupMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
