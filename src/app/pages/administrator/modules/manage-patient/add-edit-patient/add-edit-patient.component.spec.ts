import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPatientComponent } from './add-edit-patient.component';

describe('AddEditPatientComponent', () => {
  let component: AddEditPatientComponent;
  let fixture: ComponentFixture<AddEditPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditPatientComponent]
    });
    fixture = TestBed.createComponent(AddEditPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
