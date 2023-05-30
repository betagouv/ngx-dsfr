/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

/**
 * Internal imports
 */
import { TestHostComponent } from './test-host.component';
import {
  DsfrTabComponent,
  EMPTY_ARIALABEL_ERROR,
  RoutedTabDefinition
} from '../tab.component';
import { DsfrTabHarness } from './tab.harness';
import { DsfrProjectedTabDirective } from '../projected-tab.directive';
import { TabDefinition } from '../tab-definition';

describe('DsfrTabComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrTabComponent;
  let harnessLoader: HarnessLoader;
  let dsfrTabHarness: DsfrTabHarness;

  const testAriaLabel = 'Tabs for amazing content';
  const testIcon = 'fr-icon-checkbox-line';
  const testRoutedTab1: RoutedTabDefinition = {
    id: 'routed-tab-1',
    label: 'Routed Tab 1',
    icon: testIcon,
    route: 'route-1'
  };
  const testRoutedTab2: RoutedTabDefinition = {
    id: 'routed-tab-2',
    label: 'Routed Tab 2',
    icon: testIcon,
    route: 'route-2'
  };
  const testProjectedTab1: TabDefinition = {
    id: 'projected-tab-1',
    label: 'Projected Tab 1',
    icon: testIcon
  };
  const testProjectedTab2: TabDefinition = {
    id: 'projected-tab-2',
    label: 'Projected Tab 2',
    icon: testIcon
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [
        DsfrTabComponent,
        DsfrProjectedTabDirective,
        TestHostComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrTabComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrTabComponent LATER.
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

  it('should throw an error when the ariaLabel property is not provided', async () => {
    try {
      fixture.detectChanges();
      throw 'It should have thrown an error about "ariaLabel"';
    } catch (error) {
      expect(error).toBe(EMPTY_ARIALABEL_ERROR);
    }
  });

  describe('all required properties are provided ', () => {
    beforeEach(async () => {
      testHost.testAriaLabel = testAriaLabel;
    });

    describe('and we use Routed Tabs, ', () => {
      beforeEach(async () => {
        testHost.testRoutedTabs = [testRoutedTab1, testRoutedTab2];
        dsfrTabHarness = await harnessLoader.getHarness<DsfrTabHarness>(
          DsfrTabHarness
        );
      });

      it('should display the proper text inside the Tabs', async () => {
        expect(await dsfrTabHarness.getTabText(0)).toBe('Routed Tab 1');
        expect(await dsfrTabHarness.getTabText(1)).toBe('Routed Tab 2');
      });

      it('should have the proper class for the Tabs, when an icon is provided', async () => {
        expect(await dsfrTabHarness.getTabClass(0)).toContain(testIcon);
      });

      it('should use the Routed template for the Panels, when a non empty routedTabs is provided', async () => {
        expect(await dsfrTabHarness.getRoutedPanels()).toHaveLength(1);
      });
    });

    describe('and we use Projected Tabs, ', () => {
      beforeEach(async () => {
        testHost.testProjectedTabs = [testProjectedTab1, testProjectedTab2];
        dsfrTabHarness = await harnessLoader.getHarness<DsfrTabHarness>(
          DsfrTabHarness
        );
      });

      it('should use the Projected template for the Panels, when an empty routedTabs is provided', async () => {
        expect(await dsfrTabHarness.getRoutedPanels()).toHaveLength(0);
        expect(await dsfrTabHarness.getPanelText(0)).toContain('🥗');
        expect(await dsfrTabHarness.getPanelText(1)).toBe('');
      });

      it('should display the proper Panel, when a Tab is clicked upon', async () => {
        expect(componentUnderTest.selectedTab).toBe(0);

        const tab = fixture.debugElement.nativeElement.querySelector(
          'button#projected-tab-2'
        );
        tab.click();

        expect(componentUnderTest.selectedTab).toBe(1);
        expect(await dsfrTabHarness.getPanelText(0)).toBe('');
        expect(await dsfrTabHarness.getPanelText(1)).toContain('🍏');
      });
    });
  });
});
