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
import { RouterLinkDirectiveStub } from '@betagouv/ngx-dsfr/testing';
import { ElementAlignment } from '@betagouv/ngx-dsfr';

/**
 * Internal imports
 */
import {
  DsfrNavigationComponent,
  EMPTY_LABEL_ERROR,
  EMPTY_LINK_ERROR,
  EMPTY_TITLE_ERROR,
} from '../navigation.component';
import { TestHostComponent } from './test-host.component';
import { DsfrNavigationHarness } from './navigation.harness';


describe('DsfrLinkComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrNavigationComponent;
  let harnessLoader: HarnessLoader;
  let dsfrNavigationHarness: DsfrNavigationHarness;

  const testLabel: string = 'Test Label';
  const testExternalLink: string = 'https://angular.io/guide/testing';
  const testInternalLink: string = '/another/route';
  const testTitle: string = 'Test Title';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DsfrNavigationComponent,
        TestHostComponent,
        RouterLinkDirectiveStub
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrNavigationComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrLinkComponent LATER.
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

  it('should display the right template when backToTop is set to true', async () => {
    testHost.testBackToTop = true;

    /*
     * We're retrieving the Test Harness HERE since we can now,
     * without any problem, trigger the Change Detection mechanism
     *
     * WARNING: Triggers the Change Detection mechanism
     */
    dsfrNavigationHarness = await harnessLoader.getHarness<DsfrNavigationHarness>(
      DsfrNavigationHarness
    );
    expect(await dsfrNavigationHarness.getNavigationText()).toBe('Haut de page');
    expect(await dsfrNavigationHarness.getNavigationAttribute('href')).toBe('#top');
  });

  describe(', when backToTop is not provided or is false, ', () => {
    it('should throw an error when no label is provided', async () => {
      try {
        fixture.detectChanges();
        throw 'It should have thrown an error about "label"';
      } catch (error) {
        expect(error).toBe(EMPTY_LABEL_ERROR);
      }
    });

    it('should throw an error when no link is provided', () => {
      try {
        testHost.testLabel = testLabel;
        fixture.detectChanges();
        throw 'It should have thrown an error about "link"';
      } catch (error) {
        expect(error).toBe(EMPTY_LINK_ERROR);
      }
    });

    it('should throw an error when no title is provided with an external link', () => {
      try {
        testHost.testLabel = testLabel;
        testHost.testLink = testExternalLink;
        fixture.detectChanges();
        throw 'It should have thrown an error about "title"';
      } catch (error) {
        expect(error).toBe(EMPTY_TITLE_ERROR);
      }
    });

    describe(' all required properties are provided, ', () => {
      beforeEach(() => {
        testHost.testLabel = testLabel;
        testHost.testLink = testExternalLink;
        testHost.testTitle = testTitle;
        testHost.testIcon = 'ancient-gate-fill';
        testHost.testIconAlignment = ElementAlignment.RIGHT;
      });

      describe(' and inline is set to true ( default ), ', () => {
        beforeEach(async () => {
          /*
           * We're retrieving the Test Harness HERE since we can now,
           * without any problem, trigger the Change Detection mechanism
           *
           * WARNING: Triggers the Change Detection mechanism
           */
          dsfrNavigationHarness = await harnessLoader.getHarness<DsfrNavigationHarness>(
            DsfrNavigationHarness
          );
        });

        it('should have NO added classes', async () => {
          expect(await dsfrNavigationHarness.getNavigationAttribute('class')).toBe(null);
        });
      });
    });
  });
});
