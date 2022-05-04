import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWaybillsComponent } from './create-waybills.component';

describe('CreateWaybillsComponent', () => {
  let component: CreateWaybillsComponent;
  let fixture: ComponentFixture<CreateWaybillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWaybillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWaybillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
