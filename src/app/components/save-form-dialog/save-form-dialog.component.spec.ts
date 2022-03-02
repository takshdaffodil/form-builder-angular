import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFormDialogComponent } from './save-form-dialog.component';

describe('SaveFormDialogComponent', () => {
  let component: SaveFormDialogComponent;
  let fixture: ComponentFixture<SaveFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
