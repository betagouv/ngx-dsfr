/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

/**
 * Internal imports
 */
import { UploadModuleComponent } from './upload-module.component';
import { ModulesModule } from '../../modules.module';

describe('UploadModuleComponent', () => {
  let component: UploadModuleComponent;
  let fixture: ComponentFixture<UploadModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ModulesModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
