import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealpickerPopupComponent } from './mealpicker-popup.component';

describe('MealpickerPopupComponent', () => {
  let component: MealpickerPopupComponent;
  let fixture: ComponentFixture<MealpickerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealpickerPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealpickerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
