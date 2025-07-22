import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Employeelayout } from './employeelayout';

describe('Employeelayout', () => {
  let component: Employeelayout;
  let fixture: ComponentFixture<Employeelayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Employeelayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Employeelayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
