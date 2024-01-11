/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { FormsModule } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { RouterLinkDirectiveStub } from '@betagouv/ngx-dsfr/testing';

/**
 * Internal imports
 */
import { TestHostComponent } from './test-host.component';
import { DsfrUploadComponent, EMPTY_ID_ERROR, EMPTY_NAME_ERROR } from '../upload.component';
import { DsfrUploadHarness } from './upload.harness';

describe('DsfrFooterComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrUploadComponent;
  let harnessLoader: HarnessLoader;
  let dsfrUploadHarness: DsfrUploadHarness;

  const testName = 'testName';
  const testLabel = 'testLabel';
  const testId = 'testId'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        DsfrUploadComponent,
        TestHostComponent,
        RouterLinkDirectiveStub
      ]
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
    it('should throw an error when no name is provided', async () => {
      try {
        fixture.detectChanges();
        throw 'It should have thrown an error about "NAME"';
      } catch (error) {
        expect(error).toBe(EMPTY_NAME_ERROR);
      }
    });
  });

  describe('all required properties are provided, ', () => {
    beforeEach(async () => {
      testHost.testName = testName;
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
  });
});
