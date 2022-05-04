import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingClassificationComponent } from './building-classification.component';

describe('BuildingClassificationComponent', () => {
  let component: BuildingClassificationComponent;
  let fixture: ComponentFixture<BuildingClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingClassificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
