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
import { EMPTY_LABEL_AND_ICON_ERROR } from '../button.component';
import { DsfrButtonComponent } from '../button.component';
import { TestHostComponent } from './test-host.component';
import { DsfrButtonHarness } from './button.harness';


describe('DsfrButtonComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrButtonComponent;
  let harnessLoader: HarnessLoader;
  let dsfrButtonHarness: DsfrButtonHarness;

  const testLabel = 'Test Label';
  const testIcon = 'fr-icon-checkbox-circle-line';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DsfrButtonComponent,
        TestHostComponent,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrButtonComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrButtonComponent LATER.
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

  it('should throw an error when no label and icon are provided', async () => {
    try {
      fixture.detectChanges();
      throw 'It should have thrown an error about "label and icon"';
    } catch (error) {
      expect(error).toBe(EMPTY_LABEL_AND_ICON_ERROR);
    }
  });

  describe(' all required properties are provided, ', () => {
    beforeEach(async () => {
      testHost.testLabel = testLabel;
      testHost.testIcon = testIcon;
      dsfrButtonHarness = await harnessLoader.getHarness<DsfrButtonHarness>(
        DsfrButtonHarness
      );
    });

    it('should set title identical to label when no title provided', async () => {
      const title: string | null = await dsfrButtonHarness.getButtonAttribute('title');
      const label: string | null = await dsfrButtonHarness.getButtonText();

      expect(title).toBe(label);
    });

    it('should add icon class when icon is provided', async () => {
      const classes: string | null = await dsfrButtonHarness.getButtonAttribute('class');
      expect(classes).toContain(testIcon);
    });

    it('should have added classes', async () => {
      const classes: string | null =
        await dsfrButtonHarness.getButtonAttribute('class');
      expect(classes).toContain('fr-btn');
      expect(classes).toContain('fr-btn--primary');
      expect(classes).toContain('fr-btn--md');
    });
  });
});
