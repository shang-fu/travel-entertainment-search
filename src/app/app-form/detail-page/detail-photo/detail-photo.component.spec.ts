import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPhotoComponent } from './detail-photo.component';

describe('DetailPhotoComponent', () => {
  let component: DetailPhotoComponent;
  let fixture: ComponentFixture<DetailPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
