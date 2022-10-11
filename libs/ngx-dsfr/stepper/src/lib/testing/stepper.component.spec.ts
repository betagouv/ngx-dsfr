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
import {
  DsfrStepperComponent,
  EMPTY_NEXT_STEP_ERROR,
  EMPTY_STEPS_ERROR,
  EMPTY_TITLE_ERROR
} from '../stepper.component';
import { TestHostComponent } from './test-host.component';
import { DsfrStepperHarness } from './stepper.harness';

describe('DsfrBadgeComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrStepperComponent;
  let harnessLoader: HarnessLoader;
  let dsfrStepperHarness: DsfrStepperHarness;

  const testStepTitle = 'testStepTitle';
  const testNumberOfSteps = 4;
  const testNextStepTitle = 'testNextStepTitle';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DsfrStepperComponent,
        TestHostComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrStepperComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrBadgeComponent LATER.
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

  it('should throw an error when no title for the current step is provided', async () => {
    try {
      fixture.detectChanges();
      throw 'It should have thrown an error about "title"';
    } catch (error) {
      expect(error).toBe(EMPTY_TITLE_ERROR);
    }
  });

  it('should throw an error when no number of steps is provided', async () => {
    testHost.testStepTitle = testStepTitle;
    try {
      fixture.detectChanges();
      throw 'It should have thrown an error about "numberOfSteps"';
    } catch (error) {
      expect(error).toBe(EMPTY_STEPS_ERROR);
    }
  });

  it('should throw an error when no next step title is provided and the current step is not the last', () => {
    testHost.testStepTitle = testStepTitle;
    testHost.testNumberOfSteps = testNumberOfSteps;
    try {
      fixture.detectChanges();
      throw 'It should have thrown an error about "nextStepTitle"';
    } catch (error) {
      expect(error).toBe(EMPTY_NEXT_STEP_ERROR);
    }
  });

  describe('when all required properties are provided, ', () => {
    beforeEach(async () => {
      testHost.testStepTitle = testStepTitle;
      testHost.testNumberOfSteps = testNumberOfSteps;
      testHost.testNextStepTitle = testNextStepTitle;

      /*
       * We're retrieving the Test Harness HERE since we can now,
       * without any problem, trigger the Change Detection mechanism
       *
       * WARNING: Triggers the Change Detection mechanism
       */
      dsfrStepperHarness = await harnessLoader.getHarness<DsfrStepperHarness>(
        DsfrStepperHarness
      );
    });

    it('should have initialized step subtitle', async () => {
      const fullTitle = await dsfrStepperHarness.getStepperFullTitle();
      expect(fullTitle).toContain(testStepTitle);
      expect(fullTitle).toContain(testNumberOfSteps.toString());
      expect(fullTitle).toContain('1'); // Default step
    });

    it('should get the right steps', async () => {
      const currentStep = await dsfrStepperHarness.getStepperStepsAttribute('data-fr-current-step');
      const numberOfSteps = await dsfrStepperHarness.getStepperStepsAttribute('data-fr-steps');
      expect(currentStep).toContain('1');
      expect(numberOfSteps).toContain(testNumberOfSteps.toString());
    });
  });
});
