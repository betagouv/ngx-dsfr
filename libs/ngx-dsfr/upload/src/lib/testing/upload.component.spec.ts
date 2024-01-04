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
import { TestHostComponent } from './test-host.component';
import { DsfrFooterComponent, EMPTY_ALT_ERROR } from '../footer.component';
import { DsfrFooterHarness } from './footer.harness';

describe('DsfrFooterComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrFooterComponent;
  let harnessLoader: HarnessLoader;
  let dsfrFooterHarness: DsfrFooterHarness;

  const testInstitution: string = "Ministère\nde l'enseignement\nsupérieur,\nde la recherche\net de l'innovation";
  const testOperatorLogoSrc: string = 'some/path/to/an/image';
  const testOperatorLogoAlt: string = 'the text in the image';
  const testAppName: string = 'My Test App';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DsfrFooterComponent,
        TestHostComponent,
        RouterLinkDirectiveStub
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrFooterComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrFooterComponent LATER.
     *
     * We're NOT doing both HERE since getHarness() triggers
     * indirectly the Change Detection mechanism and thus,
     * Data Binding and ngOnInit()...
     */
    harnessLoader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should display the institution properly when it is provided', async () => {
    testHost.testInstitution = testInstitution;

    /*
     * We're retrieving the Test Harness HERE since we can now,
     * without any problem, trigger the Change Detection mechanism
     *
     * WARNING: Triggers the Change Detection mechanism
     */
    dsfrFooterHarness = await harnessLoader.getHarness<DsfrFooterHarness>(
      DsfrFooterHarness
    );

    expect(await dsfrFooterHarness.getInstitution()).toBe(
      testInstitution.replaceAll('\n', '  ')
    );
    expect(await dsfrFooterHarness.getInstitutionElementBrs()).toHaveLength(4);
  });

  it('should throw an error when operatorLogoSrc is provided and not operatorLogoAlt', () => {
    try {
      testHost.testInstitution = testInstitution;
      testHost.testOperatorLogoSrc = testOperatorLogoSrc;
      fixture.detectChanges();
      throw 'It should have thrown an error about "operatorLogoAlt"';
    } catch (error) {
      expect(error).toBe(EMPTY_ALT_ERROR);
    }
  });

  it("should display the operator's logo properly when operatorLogoSrc and operatorLogoAlt are provided", async () => {
    testHost.testInstitution = testInstitution;
    testHost.testOperatorLogoSrc = testOperatorLogoSrc;
    testHost.testOperatorLogoAlt = testOperatorLogoAlt;

    /*
     * We're retrieving the Test Harness HERE since we can now,
     * without any problem, trigger the Change Detection mechanism
     *
     * WARNING: Triggers the Change Detection mechanism
     */
    dsfrFooterHarness = await harnessLoader.getHarness<DsfrFooterHarness>(
      DsfrFooterHarness
    );

    expect(await dsfrFooterHarness.getLinkTitle()).toBe(
      'Retour à l’accueil du site - ' +
      testOperatorLogoAlt +
      ' - ' +
      testInstitution.replaceAll('\n', ' ')
    );
  });

  it("should display the service's name properly when appName is provided and NOT operatorLogoSrc", async () => {
    testHost.testInstitution = testInstitution;
    testHost.testAppName = testAppName;

    /*
     * We're retrieving the Test Harness HERE since we can now,
     * without any problem, trigger the Change Detection mechanism
     *
     * WARNING: Triggers the Change Detection mechanism
     */
    dsfrFooterHarness = await harnessLoader.getHarness<DsfrFooterHarness>(
      DsfrFooterHarness
    );

    expect(await dsfrFooterHarness.getLinkTitle()).toBe(
      'Retour à l’accueil du site - ' + testAppName + ' - ' + testInstitution.replaceAll('\n', ' ')
    );
  });

  it('should display the proper Template when appName AND operatorLogoSrc are provided', async () => {
    testHost.testInstitution = testInstitution;
    testHost.testOperatorLogoSrc = testOperatorLogoSrc;
    testHost.testOperatorLogoAlt = testOperatorLogoAlt;
    testHost.testAppName = testAppName;
    /*
     * We're retrieving the Test Harness HERE since we can now,
     * without any problem, trigger the Change Detection mechanism
     *
     * WARNING: Triggers the Change Detection mechanism
     */
    dsfrFooterHarness = await harnessLoader.getHarness<DsfrFooterHarness>(
      DsfrFooterHarness
    );

    expect(await dsfrFooterHarness.getLinkTitle()).toBe(
      'Retour à l’accueil du site' +
      ' - ' +
      testOperatorLogoAlt +
      ' - ' +
      testInstitution.replaceAll('\n', ' ')
    );
  });
});
