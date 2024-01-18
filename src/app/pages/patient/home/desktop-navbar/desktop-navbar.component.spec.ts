import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopNavbarComponent } from './desktop-navbar.component';

describe('DesktopNavbarComponent', () => {
  let component: DesktopNavbarComponent;
  let fixture: ComponentFixture<DesktopNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesktopNavbarComponent]
    });
    fixture = TestBed.createComponent(DesktopNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
