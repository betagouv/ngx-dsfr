/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Internal imports
 */
import { UploadModuleComponent } from './upload-module.component';

describe('UploadModuleComponent', () => {
  let component: UploadModuleComponent;
  let fixture: ComponentFixture<UploadModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
