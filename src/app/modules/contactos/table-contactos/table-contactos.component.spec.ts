import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableContactosComponent } from './table-contactos.component';

describe('TableContactosComponent', () => {
  let component: TableContactosComponent;
  let fixture: ComponentFixture<TableContactosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableContactosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableContactosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
