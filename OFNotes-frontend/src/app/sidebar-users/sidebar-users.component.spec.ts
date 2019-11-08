import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarUsersComponent } from './sidebar-users.component';

describe('SidebarUsersComponent', () => {
  let component: SidebarUsersComponent;
  let fixture: ComponentFixture<SidebarUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
