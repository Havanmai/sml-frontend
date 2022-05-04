import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingUserModalComponent } from './listing-user-modal.component';

describe('ListingUserModalComponent', () => {
  let component: ListingUserModalComponent;
  let fixture: ComponentFixture<ListingUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingUserModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
