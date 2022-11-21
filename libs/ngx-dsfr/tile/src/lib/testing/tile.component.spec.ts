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
import { Breakpoint } from '@betagouv/ngx-dsfr';

/**
 * Internal imports
 */
import {
  DsfrTileComponent,
  EMPTY_LINK_ERROR,
  EMPTY_TITLE_ERROR,
  TemplateAlign,
} from '../tile.component';
import { TestHostComponent } from './test-host.component';
import { DsfrTileHarness } from './tile.harness';


describe('DsfrTileComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrTileComponent;
  let harnessLoader: HarnessLoader;
  let dsfrTileHarness: DsfrTileHarness;

  const testDescription: string = 'Test Description';
  const testExternalLink: string = 'https://angular.io/guide/testing';
  const testInternalLink: string = '/another/route';
  const testTitle: string = 'Test Title';
  const testAlign: TemplateAlign = 'vertical';
  const testBreakpoint: Breakpoint = 'md';
  const testImage: string = 'https://www.gouvernement.fr/sites/default/files/static_assets/placeholder.1x1.png';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DsfrTileComponent,
        TestHostComponent,
        RouterLinkDirectiveStub
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrTileComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrTileComponent LATER.
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

  describe('when required inputs are not provided, ', () => {

    it('should throw an error when no title is provided', () => {
      try {
        fixture.detectChanges();
        throw 'It should have thrown an error about "title"';
      } catch (error) {
        expect(error).toBe(EMPTY_TITLE_ERROR);
      }
    });

    it('should throw an error when no link is provided', () => {
      try {
        testHost.testTitle = testTitle;
        fixture.detectChanges();
        throw 'It should have thrown an error about "link"';
      } catch (error) {
        expect(error).toBe(EMPTY_LINK_ERROR);
      }
    });
  });

  describe(' all required properties are provided, ', () => {

    beforeEach(async () => {

      testHost.testLink = testInternalLink;
      testHost.testTitle = testTitle;
      testHost.testDescription = testDescription;
      testHost.testAlign = testAlign;
      testHost.testBreakpoint = testBreakpoint;
      testHost.testImage = testImage;
      /*
         * We're retrieving the Test Harness HERE since we can now,
         * without any problem, trigger the Change Detection mechanism
         *
         * WARNING: Triggers the Change Detection mechanism
         */
      dsfrTileHarness = await harnessLoader.getHarness<DsfrTileHarness>(DsfrTileHarness);
    });

    it('should display the right template when an external link is provided', async () => {

      testHost.testLink = testExternalLink;

      expect(await dsfrTileHarness.getLinkElementAttribute('href')).toBe(testExternalLink);
      expect(await dsfrTileHarness.getLinkElementAttribute('target')).toBe('_blank');
    });

    it('should display the right template when an internal link is provided', async () => {

      // Retrieving an instance of the RouterLinkDirectiveStub directive
      const anchorWithRouterLink: DebugElement = fixture.debugElement.query(
        By.directive(RouterLinkDirectiveStub)
      );
      const routerLinkStubInstance = anchorWithRouterLink.injector.get(RouterLinkDirectiveStub);
      expect(routerLinkStubInstance.linkParams).toBe(testInternalLink);
    });

    it('should display the right image path', async () => {
      expect(await dsfrTileHarness.getImageAttribute('src')).toBe(testImage);
    });

    it('should display the right text description', async () => {
      expect(await dsfrTileHarness.getDescriptionText()).toBe(testDescription);
    });
  });
});
