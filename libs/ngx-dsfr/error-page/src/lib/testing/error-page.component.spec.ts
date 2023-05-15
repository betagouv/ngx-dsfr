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
import { RouterLinkDirectiveStub } from '@betagouv/ngx-dsfr/testing';

/**
 * Internal imports
 */
import {
  DsfrErrorPageComponent,
  EMPTY_APPNAME_503_ERROR,
  EMPTY_TITLE_ERROR
} from '../error-page.component';
import { TestHostComponent } from './test-host.component';
import { DsfrErrorPageHarness } from './error-page.harness';


describe('DsfrErrorPageComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrErrorPageComponent;
  let harnessLoader: HarnessLoader;
  let dsfrErrorPageHarness: DsfrErrorPageHarness;

  const testAppName: string = 'Test Label';
  const testHomeLink: string = '/another/route';
  const testContactUsLink: string = '/another/route';
  const testTitle: string = 'Test Title';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DsfrErrorPageComponent,
        TestHostComponent,
        RouterLinkDirectiveStub
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrErrorPageComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrErrorPageComponent LATER.
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

  it('should throw an error when no app name is provided and 503 error status is set', async () => {
    testHost.testTitle = testTitle;
    testHost.testStatus = '503';
    try {
      fixture.detectChanges();
      throw 'It should have thrown an error about "app name"';
    } catch (error) {
      expect(error).toBe(EMPTY_APPNAME_503_ERROR);
    }
  });

  describe('when all required properties are provided, ', () => {
    beforeEach(async () => {
      testHost.testTitle = testTitle;
      testHost.testHomeLink = testHomeLink;
      testHost.testContactUsLink = testContactUsLink;

      /*
       * We're retrieving the Test Harness HERE since we can now,
       * without any problem, trigger the Change Detection mechanism
       *
       * WARNING: Triggers the Change Detection mechanism
       */
      dsfrErrorPageHarness = await harnessLoader.getHarness<DsfrErrorPageHarness>(
        DsfrErrorPageHarness
      );
    });

    it('should have the right title', async () => {
      const title = await dsfrErrorPageHarness.getTitleText();
      expect(title).toEqual(testTitle);
    });

    it('should have the right href for the home link', async () => {
      const href = await dsfrErrorPageHarness.getContactUsLinkHrefAttribute();
      expect(href).toEqual(testHomeLink);
    });

    it('should have the right href for the contact us link', async () => {
      const href = await dsfrErrorPageHarness.getContactUsLinkHrefAttribute();
      expect(href).toEqual(testContactUsLink);
    });

  });

});
