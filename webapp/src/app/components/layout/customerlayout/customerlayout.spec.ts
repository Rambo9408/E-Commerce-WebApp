import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Customerlayout } from './customerlayout';

describe('Customerlayout', () => {
  let component: Customerlayout;
  let fixture: ComponentFixture<Customerlayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Customerlayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Customerlayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
