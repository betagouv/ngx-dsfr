/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

/**
 * Internal imports
 */
import { TestHostComponent } from './test-host.component';
import {
  DsfrUploadComponent,
  EMPTY_ID_ERROR,
  EMPTY_HINT_ERROR,
  EMPTY_FAILURE_MESSAGE_ERROR
} from '../upload.component';
import { DsfrUploadHarness } from './upload.harness';

describe('DsfrUploadComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrUploadComponent;
  let harnessLoader: HarnessLoader;
  let dsfrUploadHarness: DsfrUploadHarness;

  const testHint = 'testHint';
  const testLabel = 'testLabel';
  const testId = 'testId'
  const testFailureMessage = 'testFailureMessage';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DsfrUploadComponent, TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrUploadComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrUploadComponent LATER.
     *
     * We're NOT doing both HERE since getHarness() triggers
     * indirectly the Change Detection mechanism and this,
     * Data Binding and ngOnInit()...
     */
    harnessLoader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should be created', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should throw an error when no hint is provided', async () => {
    try {
      fixture.detectChanges();
      throw 'It should have thrown an error about "HINT"';
    } catch (error) {
      expect(error).toBe(EMPTY_HINT_ERROR);
    }
  });

  describe('only hint is provided, ', () => {
    beforeEach(async () => {
      testHost.testHint = testHint;
    });
    it('should throw an error when no id is provided', async () => {
      try {
        fixture.detectChanges();
        throw 'It should have thrown an error about "ID"';
      } catch (error) {
        expect(error).toBe(EMPTY_ID_ERROR);
      }
    });
  });

  describe('all required properties are provided, ', () => {
    beforeEach(async () => {
      testHost.testHint = testHint;
      testHost.testId = testId;
      testHost.testLabel = testLabel;


      dsfrUploadHarness = await harnessLoader.getHarness<DsfrUploadHarness>(
        DsfrUploadHarness
      );
    });

    it('should have the right id for the input attribute', async () => {
      const id = await dsfrUploadHarness.getInputId();
      expect(id).toEqual(testId);
    });

    it('should throw an error when hasFailed is true and failureMessage is not provided', async () => {
      try {
        testHost.testHasFailed = true;
        fixture.detectChanges();
        throw 'It should have thrown an error about "failureMessage"';
      } catch (error) {
        expect(error).toBe(EMPTY_FAILURE_MESSAGE_ERROR);
      }
    });

    it('should have the proper class and aria-describedby when there is an error', async () => {
      testHost.testFailureMessage = testFailureMessage;
      testHost.testHasFailed = true;

      const inputClassAtribute = await dsfrUploadHarness.getInputClass();
      const inputAriaDescribedByAtribute = await dsfrUploadHarness.getInputAriaDescribedBy();

      expect(inputClassAtribute).toContain('error');
      expect(inputAriaDescribedByAtribute).toContain('error');
    });

  });
});
