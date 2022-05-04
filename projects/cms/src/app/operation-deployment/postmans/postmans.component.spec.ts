import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostmansComponent } from './postmans.component';

describe('PostmansComponent', () => {
  let component: PostmansComponent;
  let fixture: ComponentFixture<PostmansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostmansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostmansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
