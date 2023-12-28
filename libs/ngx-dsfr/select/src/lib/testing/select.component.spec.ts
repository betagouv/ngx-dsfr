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
import { DsfrSelectComponent, EMPTY_LABEL_ERROR, SelectOption } from '../select.component';
import { TestHostComponent } from './test-host.component';
import { DsfrSelectHarness } from './select.harness';
import { FormsModule } from '@angular/forms';

describe('DsfrRadioComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrSelectComponent;
  let harnessLoader: HarnessLoader;
  let dsfrSelectHarness: DsfrSelectHarness;

  const testLabel = 'testLabel';
  const testId = 'testId';
  const testOptions: SelectOption[] = [{
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
        DsfrSelectComponent,
        TestHostComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrSelectComponent)
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

  it('should throw an error when no label is provided', async () => {
    try {
      fixture.detectChanges();
      throw 'It should have thrown an error about "label"';
    } catch (error) {
      expect(error).toBe(EMPTY_LABEL_ERROR);
    }
  });

  describe('all required properties are provided, ', () => {
    beforeEach(async () => {
      testHost.testLabel = testLabel;
      testHost.testId = testId;
      testHost.testOptions = testOptions;
      dsfrSelectHarness = await harnessLoader.getHarness<DsfrSelectHarness>(
        DsfrSelectHarness
      );
    });

    it('should have the right label', async () => {
      const label = await dsfrSelectHarness.getLabelValue();
      expect(label).toEqual(testLabel);
    });

    it('should have the default placeholder', async () => {
      const placeholder = await dsfrSelectHarness.getPlaceholder();
      expect(placeholder).toEqual('Selectionnez une option')
    });

    it('should have the right placeholder', async () => {
      const testDescription =  'test description';
      testHost.testDescription = testDescription;
      fixture.detectChanges();
      const placeholder = await dsfrSelectHarness.getPlaceholder();
      expect(placeholder).toEqual(testDescription)
    });
  });
});
