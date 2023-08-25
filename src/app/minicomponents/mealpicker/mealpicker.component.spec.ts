import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealpickerComponent } from './mealpicker.component';

describe('MealpickerComponent', () => {
  let component: MealpickerComponent;
  let fixture: ComponentFixture<MealpickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealpickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
