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
import { DsfrToggleComponent, EMPTY_ID_ERROR } from '../toggle.component';
import { TestHostComponent } from './test-host.component';
import { DsfrToggleHarness } from './toggle.harness';

describe('DsfrToggleComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrToggleComponent;
  let harnessLoader: HarnessLoader;
  let dsfrToggleHarness: DsfrToggleHarness;

  const testId = 'test-id';
  const testCheckedLabel = 'test-checked';
  const testUnCheckedLabel = 'test-un-checked';
  const testLabel = 'Test Label';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DsfrToggleComponent,
        TestHostComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrToggleComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrToggleComponent LATER.
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

  describe('all required properties are provided, ', () => {
    beforeEach(async () => {
      testHost.testId = testId;
      testHost.testLabel = testLabel;
      testHost.testCheckedLabel = testCheckedLabel;
      testHost.testUnCheckedLabel = testUnCheckedLabel;
      dsfrToggleHarness = await harnessLoader.getHarness<DsfrToggleHarness>(
        DsfrToggleHarness
      );
    });

    it('should have the right id for the input attribute', async () => {
      const id = await dsfrToggleHarness.getToggleId();
      expect(id).toEqual(testId);
    });
  });
});
