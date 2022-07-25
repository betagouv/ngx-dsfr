/**
 * Angular imports
 */
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
import {
  EMPTY_LABEL_ERROR,
} from '../button.component';
import { DsfrButtonComponent } from '../button.component';
import { TestHostComponent } from './test-host.component';
import { DsfrButtonHarness } from './button.harness';
import { ElementAlignment } from '@betagouv/ngx-dsfr';

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

  it('should throw an error when no label is provided', async () => {
    try {
      fixture.detectChanges();
      throw 'It should have thrown an error about "label"';
    } catch (error) {
      expect(error).toBe(EMPTY_LABEL_ERROR);
    }
  });

  describe(' all required properties are provided, ', () => {
    beforeEach(() => {
      testHost.testLabel = testLabel;
    });

    describe(' and inline is set to false, ', () => {
      beforeEach(async () => {
        /*
         * We're retrieving the Test Harness HERE since we can now,
         * without any problem, trigger the Change Detection mechanism
         *
         * WARNING: Triggers the Change Detection mechanism
         */
        dsfrButtonHarness = await harnessLoader.getHarness<DsfrButtonHarness>(
          DsfrButtonHarness
        );
      });

      it('should have added classes', async () => {
        const classes: string | null =
          await dsfrButtonHarness.getAnchorAttribute('class');
        expect(classes).toContain('fr-btn');
        expect(classes).toContain('fr-btn--primary');
        expect(classes).toContain('fr-btn--md');
      });
    });
  });
});
