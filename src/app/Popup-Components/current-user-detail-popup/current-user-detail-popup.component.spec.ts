import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUserDetailPopupComponent } from './current-user-detail-popup.component';

describe('CurrentUserDetailPopupComponent', () => {
  let component: CurrentUserDetailPopupComponent;
  let fixture: ComponentFixture<CurrentUserDetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentUserDetailPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentUserDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
