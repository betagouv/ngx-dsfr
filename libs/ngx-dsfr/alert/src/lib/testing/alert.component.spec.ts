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
import { AlertType } from '@betagouv/ngx-dsfr';

/**
 * Internal imports
 */
import {
  DsfrAlertComponent,
  EMPTY_TITLE_ERROR,
  EMPTY_TYPE_ERROR
} from '../alert.component';
import { TestHostComponent } from './test-host.component';
import { DsfrAlertHarness } from './alert.harness';

describe('DsfrAlertComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrAlertComponent;
  let harnessLoader: HarnessLoader;
  let dsfrAlertHarness: DsfrAlertHarness;

  const testTitle: string = 'Test Label';
  const testType: AlertType = AlertType.WARNING;
  const testDescription: string = 'Test Description';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DsfrAlertComponent,
        TestHostComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrAlertComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrAlertComponent LATER.
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

  it('should throw an error when no title is provided', async () => {
    try {
      fixture.detectChanges();
      throw 'It should have thrown an error about "title"';
    } catch (error) {
      expect(error).toBe(EMPTY_TITLE_ERROR);
    }
  });

  it('should throw an error when no type is provided', async () => {
    testHost.testTitle = testTitle;
    try {
      fixture.detectChanges();
      throw 'It should have thrown an error about "type"';
    } catch (error) {
      expect(error).toBe(EMPTY_TYPE_ERROR);
    }
  });

  describe('when all required properties are provided, ', () => {
    beforeEach(async () => {
      testHost.testTitle = testTitle;
      testHost.testType = testType;

      /*
       * We're retrieving the Test Harness HERE since we can now,
       * without any problem, trigger the Change Detection mechanism
       *
       * WARNING: Triggers the Change Detection mechanism
       */
      dsfrAlertHarness = await harnessLoader.getHarness<DsfrAlertHarness>(
        DsfrAlertHarness
      );
    });

    it('should have the right title', async () => {
      const title: string | null =
        await dsfrAlertHarness.getAlertTitle();
      expect(title).toEqual(testTitle);
    });

    it('shouldn\'t have a description', async () => {
      const description: string | null =
        await dsfrAlertHarness.getAlertDescription();
      expect(description).toBeNull();
    });

    it('should have the right description', async () => {
      testHost.testDescription = testDescription;
      fixture.detectChanges();
      const description: string | null =
        await dsfrAlertHarness.getAlertDescription();
      expect(description).toEqual(testDescription);
    });
  });
});
