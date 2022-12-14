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
  DsfrCheckboxComponent,
  EMPTY_LEGEND_ERROR,
  CheckboxItem,
  EMPTY_ITEMS_ERROR,
  EMPTY_LEGEND_ID_ERROR
} from '../checkbox.component';
import { TestHostComponent } from './test-host.component';
import { DsfrCheckboxHarness } from './checkbox.harness';

describe('DsfrCheckboxComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrCheckboxComponent;
  let harnessLoader: HarnessLoader;
  let dsfrCheckboxHarness: DsfrCheckboxHarness;

  const testLegend = 'testLegend';
  const testName = 'testName';
  const testLegendId = 'testFieldSetId';
  const testItems: CheckboxItem[] = [
    {
      label: 'item 1',
      id: 'item_1',
      value: 'item_1'
    },
    {
      label: 'item 2',
      id: 'item_2',
      value: 'item_2'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DsfrCheckboxComponent, TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrCheckboxComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrCheckboxComponent LATER.
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

  it('should throw an error when no item is provided', async () => {
    try {
      fixture.detectChanges();
      throw 'It should have thrown an error about "items"';
    } catch (error) {
      expect(error).toBe(EMPTY_ITEMS_ERROR);
    }
  });

  describe('when items are provided', () => {
    beforeEach(async () => {
      testHost.testItems = testItems;
    });

    it('should throw an error when no legend is provided', async () => {
      try {
        fixture.detectChanges();
        throw 'It should have thrown an error about "legend"';
      } catch (error) {
        expect(error).toBe(EMPTY_LEGEND_ERROR);
      }
    });
  });

  describe('when items & a legend are provided', () => {
    beforeEach(async () => {
      testHost.testItems = testItems;
      testHost.testLegend = testLegend;
    });

    it('should throw an error when no legend ID is provided', async () => {
      try {
        fixture.detectChanges();
        throw 'It should have thrown an error about "legendId"';
      } catch (error) {
        expect(error).toBe(EMPTY_LEGEND_ID_ERROR);
      }
    });
  });

  describe('when all required properties are provided, ', () => {
    beforeEach(async () => {
      testHost.testLegend = testLegend;
      testHost.testName = testName;
      testHost.testLegendId = testLegendId;
      testHost.testItems = testItems;
      dsfrCheckboxHarness = await harnessLoader.getHarness<DsfrCheckboxHarness>(
        DsfrCheckboxHarness
      );
    });

    it('should have the right number of checkbox inputs', async () => {
      const length = await dsfrCheckboxHarness.getInputsLength();
      expect(length).toEqual(testItems.length);
    });

    it('should have the right name for all checkbox', async () => {
      const names = await dsfrCheckboxHarness.getCheckboxInputsNames();
      names.forEach((name) => {
        expect(name).toEqual(testName);
      });
    });

    it('should have the right id and value for all checkbox inputs', async () => {
      const ids = await dsfrCheckboxHarness.getCheckboxInputsIds();
      const values = await dsfrCheckboxHarness.getCheckboxInputsValues();
      for (let i = 0; i < testItems.length; i++) {
        expect(ids[i]).toEqual(testItems[i].id);
        expect(values[i]).toEqual(testItems[i].value);
      }
    });
  });
});
