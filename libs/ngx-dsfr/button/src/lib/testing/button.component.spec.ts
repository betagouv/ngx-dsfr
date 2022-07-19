/**
 * Angular imports
 */
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

/**
 * 3rd-party imports
 */


/**
 * Internal imports
 */
import { DsfrButtonComponent } from '../button.component';
import { TestHostComponent } from './test-host.component';
import { DsfrButtonHarness } from './button.harness';

describe('DsfrButtonComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrButtonComponent;
  let harnessLoader: HarnessLoader;
  let dsfrButtonHarness: DsfrButtonHarness;

  const testLabel = 'Test Label';
  const testTitle = 'Test Title';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DsfrButtonComponent,
        TestHostComponent,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrButtonComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrButtonComponent LATER.
     *
     * We're NOT doing both HERE since getHarness() triggers
     * indirectly the Change Detection mechanism and thus,
     * Data Binding and ngOnInit()...
     */
    harnessLoader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should be created', () => {
    expect(componentUnderTest).toBeTruthy();
  });

});
