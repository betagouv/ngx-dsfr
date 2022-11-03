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
import { DsfrInputComponent, EMPTY_ID_ERROR, EMPTY_LABEL_ERROR } from '../input.component';
import { TestHostComponent } from './test-host.component';
import { DsfrInputHarness } from './input.harness';
import { FormsModule } from '@angular/forms';

describe('DsfrInputComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrInputComponent;
  let harnessLoader: HarnessLoader;
  let dsfrInputHarness: DsfrInputHarness;

  const testName = 'testName';
  const testLabel = 'testLabel';
  const testId = 'testId';
  const testPlaceholder = 'Enter some text...';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        DsfrInputComponent,
        TestHostComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrInputComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrInputComponent LATER.
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

  it('should throw an error when no id is provided', async () => {
    try {
      fixture.detectChanges();
      throw 'It should have thrown an error about "ID"';
    } catch (error) {
      expect(error).toBe(EMPTY_ID_ERROR);
    }
  });

  describe('only ID is provided, ', () => {
    beforeEach(async () => {
      testHost.testId = testId;
    });
    it('should throw an error when no label is provided', async () => {
      try {
        fixture.detectChanges();
        throw 'It should have thrown an error about "LABEL"';
      } catch (error) {
        expect(error).toBe(EMPTY_LABEL_ERROR);
      }
    });
  });

  describe('all required properties are provided, ', () => {
    beforeEach(async () => {
      testHost.testName = testName;
      testHost.testId = testId;
      testHost.testLabel = testLabel;
      testHost.testPlaceholder = testPlaceholder;
      dsfrInputHarness = await harnessLoader.getHarness<DsfrInputHarness>(
        DsfrInputHarness
      );
    });

    it('should have the right placeholder for the input attribute', async () => {
      const placeholder = await dsfrInputHarness.getInputPlaceholderAttribute();
      expect(placeholder).toEqual(testPlaceholder);
    });

    it('should have the right id for the input attribute', async () => {
      const id = await dsfrInputHarness.getInputId();
      expect(id).toEqual(testId);
    });
  });
});
