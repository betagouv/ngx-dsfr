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
import { DsfrRadioComponent, EMPTY_LEGEND_ERROR, RadioItem } from '../radio.component';
import { TestHostComponent } from './test-host.component';
import { DsfrRadioHarness } from './radio.harness';
import { FormsModule } from '@angular/forms';

describe('DsfrRadioComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrRadioComponent;
  let harnessLoader: HarnessLoader;
  let dsfrRadioHarness: DsfrRadioHarness;

  const testLegend = 'testLegend';
  const testName = 'testName';
  const testFieldSetId = 'testFieldSetId';
  const testItems: RadioItem[] = [{
    label: 'item 1',
    id: 'item_1',
    value: 'item_1'
  },
    {
      label: 'item 2',
      id: 'item_2',
      value: 'item_2'
    }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        DsfrRadioComponent,
        TestHostComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrRadioComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrRadioComponent LATER.
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

  it('should throw an error when no legend is provided', async () => {
    try {
      fixture.detectChanges();
      throw 'It should have thrown an error about "legend"';
    } catch (error) {
      expect(error).toBe(EMPTY_LEGEND_ERROR);
    }
  });

  describe('all required properties are provided, ', () => {
    beforeEach(async () => {
      testHost.testLegend = testLegend;
      testHost.testName = testName;
      testHost.testFieldSetId = testFieldSetId;
      testHost.testItems = testItems;
      dsfrRadioHarness = await harnessLoader.getHarness<DsfrRadioHarness>(
        DsfrRadioHarness
      );
    });

    it('should have the right number of radio inputs', async () => {
      const length = await dsfrRadioHarness.getInputsLength();
      expect(length).toEqual(testItems.length);
    });

    it('should have the right name for all radio inputs', async () => {
      const names = await dsfrRadioHarness.getRadioInputsNames();
      names.forEach((name) => {
        expect(name).toEqual(testName);
      });
    });

    it('should have the right id and value for all radio inputs', async () => {
      const ids = await dsfrRadioHarness.getRadioInputsIds();
      const values = await dsfrRadioHarness.getRadioInputsValues();
      for (let i = 0; i < testItems.length; i++) {
        expect(ids[i]).toEqual(testItems[i].id);
        expect(values[i]).toEqual(testItems[i].value);
      }
    });
  });
});
