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
import { DsfrSearchBarComponent, EMPTY_ID_ERROR, EMPTY_LABEL_ERROR, MINIMUM_SEARCH_CHARACTER_ERROR } from '../search-bar.component';
import { TestHostComponent } from './test-host.component';
import { DsfrSearchBarHarness } from './search-bar.harness';


describe('DsfrSearchBarComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrSearchBarComponent;
  let harnessLoader: HarnessLoader;
  let dsfrSearchBarHarness: DsfrSearchBarHarness;

  const testLabel = 'testLabel';
  const testId = 'testId';
  const testPlaceholder = 'testPlaceholder';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DsfrSearchBarComponent,
        TestHostComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrSearchBarComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrSearchBarComponent LATER.
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

  it('should throw an error when no id is provided', async () => {
    try {
      fixture.detectChanges();
      throw 'It should have thrown an error about "ID"';
    } catch (error) {
      expect(error).toBe(EMPTY_ID_ERROR);
    }
  });

  describe('when only ID is provided, ', () => {
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

  describe('when id and label are provided and we put a number equal to 0 for minCharacterForSearch\'s input, ', () => {
    beforeEach(async () => {
      testHost.testId = testId;
      testHost.testLabel = testLabel;
    });
    it('should throw an error when minCharacterForSearch is less than 1', async () => {
      testHost.testminCharacterForSearch = 0;
      try {
        fixture.detectChanges();
        throw 'It should have thrown an error about "minCharacterForSearch"';
      } catch (error) {
        expect(error).toBe(MINIMUM_SEARCH_CHARACTER_ERROR);
      }
    });
  });

  describe('when all required properties are provided, ', () => {
    beforeEach(async () => {
      testHost.testId = testId;
      testHost.testLabel = testLabel;
      testHost.testPlaceholder = testPlaceholder;
      dsfrSearchBarHarness = await harnessLoader.getHarness<DsfrSearchBarHarness>(
        DsfrSearchBarHarness
      );
    });

    it('should have the right placeholder for its input tag', async () => {
      const placeholder = await dsfrSearchBarHarness.getInputPlaceholderAttribute();
      expect(placeholder).toEqual(testPlaceholder);
    });

    it('should have the right id for the input attribute', async () => {
      const id = await dsfrSearchBarHarness.getInputId();
      expect(id).toEqual(`${testId}-input`);
    });
  });
});
