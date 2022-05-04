import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStatesComponent } from './detail-states.component';

describe('DetailStatesComponent', () => {
  let component: DetailStatesComponent;
  let fixture: ComponentFixture<DetailStatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailStatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
