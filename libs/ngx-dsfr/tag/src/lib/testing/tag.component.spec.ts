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
import { DsfrTagComponent, EMPTY_LABEL_ERROR } from '../tag.component';
import { TestHostComponent } from './test-host.component';
import { DsfrTagHarness } from './tag.harness';

describe('DsfrTagComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrTagComponent;
  let harnessLoader: HarnessLoader;
  let dsfrTagHarness: DsfrTagHarness;

  const testLabel = 'testLabel';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DsfrTagComponent,
        TestHostComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrTagComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrTagComponent LATER.
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
      dsfrTagHarness = await harnessLoader.getHarness<DsfrTagHarness>(
        DsfrTagHarness
      );
    });

    it('should have the right classes', async () => {
      const classes = await dsfrTagHarness.getTagPAttribute('class');
      expect(classes).toEqual('fr-tag');
    });
  });
});
