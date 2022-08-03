/**
 * Angular imports
 */
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

/**
 * 3rd-party imports
 */
import { ThemeColor } from '@betagouv/ngx-dsfr';

/**
 * Internal imports
 */
import {
  DsfrBadgeComponent,
  EMPTY_LABEL_ERROR,
  EMPTY_THEME_ERROR,
  EMPTY_LABEL_AND_THEME_ERROR
} from '../badge.component';
import { TestHostComponent } from './test-host.component';
import { DsfrBadgeHarness } from './badge.harness';


describe('DsfrBadgeComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrBadgeComponent;
  let harnessLoader: HarnessLoader;
  let dsfrBadgeHarness: DsfrBadgeHarness;

  const testLabel: string = 'Test Label';
  const testTheme: ThemeColor = ThemeColor.WARNING;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DsfrBadgeComponent,
        TestHostComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrBadgeComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrBadgeComponent LATER.
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

  it('should throw an error when no label and no theme is provided', async () => {
    try {
      fixture.detectChanges();
      throw 'It should have thrown an error about "label and theme"';
    } catch (error) {
      expect(error).toBe(EMPTY_LABEL_AND_THEME_ERROR);
    }
  });

  it('should throw an error when no label is provided', async () => {
    testHost.testTheme = testTheme;
    try {
      fixture.detectChanges();
      throw 'It should have thrown an error about "label"';
    } catch (error) {
      expect(error).toBe(EMPTY_LABEL_ERROR);
    }
  });

  it('should throw an error when no theme is provided', () => {
    testHost.testLabel = testLabel;
    try {
      fixture.detectChanges();
      throw 'It should have thrown an error about "theme"';
    } catch (error) {
      expect(error).toBe(EMPTY_THEME_ERROR);
    }
  });

  describe(' all required properties are provided, ', () => {
    beforeEach(async () => {
      testHost.testLabel = testLabel;
      testHost.testTheme = testTheme;

      /*
       * We're retrieving the Test Harness HERE since we can now,
       * without any problem, trigger the Change Detection mechanism
       *
       * WARNING: Triggers the Change Detection mechanism
       */
      dsfrBadgeHarness = await harnessLoader.getHarness<DsfrBadgeHarness>(
        DsfrBadgeHarness
      );
    });

    it('should have added classes', async () => {
      const classes: string | null =
        await dsfrBadgeHarness.getBadgeAttribute('class');
      expect(classes).toContain('fr-badge');
      expect(classes).toContain('fr-badge--md');
      expect(classes).toContain('fr-badge--warning');
    });
  });
});
