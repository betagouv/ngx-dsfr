/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { RouterTestingModule } from '@angular/router/testing';

/**
 * 3rd-party imports
 */
import { RouterLinkDirectiveStub } from '@betagouv/ngx-dsfr/testing';
import { DsfrLinkModule } from '@betagouv/ngx-dsfr/link';
import { DsfrBadgeModule } from '@betagouv/ngx-dsfr/badge';
import { DsfrTagModule } from '@betagouv/ngx-dsfr/tag';

/**
 * Internal imports
 */
import {
  DsfrCardComponent,
  EMPTY_LABEL_ERROR,
  EMPTY_LINK_ERROR,
  EMPTY_TITLE_ERROR
} from '../card.component';
import { TestHostComponent } from './test-host.component';
import { DsfrCardHarness } from './card.harness';

describe('DsfrCardComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrCardComponent;
  let harnessLoader: HarnessLoader;
  let dsfrCardHarness: DsfrCardHarness;

  const testLabel: string = 'Test label';
  const testDescription: string = 'Test Description';
  const testExternalLink: string = 'https://angular.io/guide/testing';
  const testInternalLink: string = '/another/route';
  const testLinkTitle: string = 'Test Title';
  const testImage: string = 'https://www.gouvernement.fr/sites/default/files/static_assets/placeholder.1x1.png';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DsfrLinkModule,
        DsfrBadgeModule,
        DsfrTagModule,
        RouterTestingModule
      ],
      declarations: [
        DsfrCardComponent,
        TestHostComponent,
        RouterLinkDirectiveStub
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrCardComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrCardComponent LATER.
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

    it('should throw an error when no label is provided', () => {
      try {
        fixture.detectChanges();
        throw 'It should have thrown an error about "label"';
      } catch (error) {
        expect(error).toBe(EMPTY_LABEL_ERROR);
      }
    });

    it('should throw an error when no title is provided', () => {
      try {
        testHost.testLabel = testLabel;
        fixture.detectChanges();
        throw 'It should have thrown an error about "title"';
      } catch (error) {
        expect(error).toBe(EMPTY_TITLE_ERROR);
      }
    });

    it('should throw an error when no link is provided', () => {
      try {
        testHost.testLabel = testLabel;
        testHost.testLinkTitle = testLinkTitle;
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
      testHost.testLabel = testLabel;
      testHost.testLinkTitle = testLinkTitle;
      testHost.testDescription = testDescription;
      testHost.testImage = testImage;
      /*
         * We're retrieving the Test Harness HERE since we can now,
         * without any problem, trigger the Change Detection mechanism
         *
         * WARNING: Triggers the Change Detection mechanism
         */
      dsfrCardHarness = await harnessLoader.getHarness<DsfrCardHarness>(DsfrCardHarness);
    });

    it('should display the right template when an external link is provided', async () => {

      testHost.testLink = testExternalLink;

      expect(await dsfrCardHarness.getLinkElementAttribute('href')).toBe(testExternalLink);
      expect(await dsfrCardHarness.getLinkElementAttribute('target')).toBe('_blank');
    });

    it('should display the right image path', async () => {
      expect(await dsfrCardHarness.getImageAttribute('src')).toBe(testImage);
    });

    it('should display the right text description', async () => {
      expect(await dsfrCardHarness.getDescriptionText()).toBe(testDescription);
    });
  });
});
