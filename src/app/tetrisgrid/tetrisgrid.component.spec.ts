import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TetrisgridComponent } from './tetrisgrid.component';

describe('TetrisgridComponent', () => {
  let component: TetrisgridComponent;
  let fixture: ComponentFixture<TetrisgridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TetrisgridComponent]
    });
    fixture = TestBed.createComponent(TetrisgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
