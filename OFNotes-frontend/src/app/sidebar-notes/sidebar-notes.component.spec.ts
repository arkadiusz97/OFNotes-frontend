import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNotesComponent } from './sidebar-notes.component';

describe('SidebarNotesComponent', () => {
  let component: SidebarNotesComponent;
  let fixture: ComponentFixture<SidebarNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
