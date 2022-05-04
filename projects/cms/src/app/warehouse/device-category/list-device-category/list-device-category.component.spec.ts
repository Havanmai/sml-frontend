import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeviceCategoryComponent } from './list-device-category.component';

describe('ListDeviceCategoryComponent', () => {
  let component: ListDeviceCategoryComponent;
  let fixture: ComponentFixture<ListDeviceCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDeviceCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeviceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
