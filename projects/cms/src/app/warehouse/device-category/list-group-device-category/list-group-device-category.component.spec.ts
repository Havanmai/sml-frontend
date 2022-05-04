import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGroupDeviceCategoryComponent } from './list-group-device-category.component';

describe('ListGroupDeviceCategoryComponent', () => {
  let component: ListGroupDeviceCategoryComponent;
  let fixture: ComponentFixture<ListGroupDeviceCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGroupDeviceCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGroupDeviceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
