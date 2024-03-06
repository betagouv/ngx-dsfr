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
import { RouterLinkDirectiveStub } from '@betagouv/ngx-dsfr/testing';

/**
 * Internal imports
 */
import {
  DsfrTooltipComponent,
  TooltipTriggerType,
  EMPTY_ID_ERROR, EMPTY_TOOLTIP_TEXT_ERROR
} from '../tooltip.component';
import { TestHostComponent } from './test-host.component';
import { DsfrTooltipHarness } from './tooltip.harness';

describe('DsfrTooltipComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrTooltipComponent;
  let harnessLoader: HarnessLoader;
  let dsfrTooltipHarness: DsfrTooltipHarness;

  const testId: string = 'test-id';
  const testTooltipText: string = 'test-tooltip-test';
  const testTriggerText: string = 'test-trigger-test';
  const testTriggerOn: TooltipTriggerType = TooltipTriggerType.HOVER;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DsfrTooltipComponent,
        TestHostComponent,
        RouterLinkDirectiveStub
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrTooltipComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrTooltipComponent LATER.
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

  describe('when required inputs are not provided, ', () => {
    it('should throw an error when no id is provided', () => {
      try {
        fixture.detectChanges();
        throw 'It should have thrown an error about "id"';
      } catch (error) {
        expect(error).toBe(EMPTY_ID_ERROR);
      }
    });

    it('should throw an error when tooltip text is provided', () => {
      try {
        testHost.testId = testId;
        fixture.detectChanges();
        throw 'It should have thrown an error about "tooltip"';
      } catch (error) {
        expect(error).toBe(EMPTY_TOOLTIP_TEXT_ERROR);
      }
    });
  });

  describe(' all required properties are provided, ', () => {
    beforeEach(async () => {
      testHost.testId = testId;
      testHost.testTooltipText = testTooltipText;
      testHost.testTriggerText = testTriggerText;
      testHost.testTriggerOn = testTriggerOn;
      /*
         * We're retrieving the Test Harness HERE since we can now,
         * without any problem, trigger the Change Detection mechanism
         *
         * WARNING: Triggers the Change Detection mechanism
         */
      dsfrTooltipHarness = await harnessLoader.getHarness<DsfrTooltipHarness>(DsfrTooltipHarness);
    });

    it('should display the hover template when the trigger on attribute is set to hover', async () => {
      expect(await dsfrTooltipHarness.getLinkElementText()).toBe(testTriggerText);
      expect(await dsfrTooltipHarness.getButtonElementText()).toBe(null);
      expect(await dsfrTooltipHarness.getTooltipElementText()).toBe(testTooltipText);
    });

    it('should display the click template when the trigger on attribute is set to click', async () => {
      testHost.testTriggerOn = TooltipTriggerType.CLICK;

      expect(await dsfrTooltipHarness.getLinkElementText()).toBe(null);
      expect(await dsfrTooltipHarness.getButtonElementText()).toBe(testTriggerText);
      expect(await dsfrTooltipHarness.getTooltipElementText()).toBe(testTooltipText);
    });
  });
});
