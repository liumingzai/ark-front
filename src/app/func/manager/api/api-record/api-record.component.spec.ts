import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRecordComponent } from './api-record.component';

describe('ApiRecordComponent', () => {
  let component: ApiRecordComponent;
  let fixture: ComponentFixture<ApiRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
