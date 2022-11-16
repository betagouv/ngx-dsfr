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
import { DsfrButtonModule } from '@betagouv/ngx-dsfr/button';

/**
 * Internal imports
 */
import { DsfrHeaderComponent } from '../header.component';
import { DsfrHeaderHarness } from './header.harness';
import { TestHostCompleteComponent } from './test-host-complete.component';
import { DsfrHeaderActionDirective } from '../header-action.directive';

describe('DsfrHeaderComponent', () => {
  let fixture: ComponentFixture<TestHostCompleteComponent>;
  let testHost: TestHostCompleteComponent;
  let componentUnderTest: DsfrHeaderComponent;
  let harnessLoader: HarnessLoader;
  let dsfrHeaderHarness: DsfrHeaderHarness;

  const testInstitution: string =
    "Ministère\nde l'enseignement\nsupérieur,\nde la recherche\net de l'innovation";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsfrButtonModule],
      declarations: [
        DsfrHeaderComponent,
        TestHostCompleteComponent,
        DsfrHeaderActionDirective,
        RouterLinkDirectiveStub
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostCompleteComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrHeaderComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrHeaderComponent LATER.
     *
     * We're NOT doing both HERE since getHarness() triggers
     * indirectly the Change Detection mechanism and thus,
     * Data Binding and ngOnInit()...
     */
    harnessLoader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should display the header actions, provided through content projection, in 2 places', async () => {
    testHost.testInstitution = testInstitution;

    /*
     * We're retrieving the Test Harness HERE since we can now,
     * without any problem, trigger the Change Detection mechanism
     *
     * WARNING: Triggers the Change Detection mechanism
     */
    dsfrHeaderHarness = await harnessLoader.getHarness<DsfrHeaderHarness>(
      DsfrHeaderHarness
    );

    expect(
      await dsfrHeaderHarness.getInstitutionAnchorElement()
    ).not.toBeNull();
    expect(await dsfrHeaderHarness.getLinkTitle()).toBe(
      'Accueil - ' + testInstitution.replaceAll('\n', ' ')
    );
    expect(await dsfrHeaderHarness.getOperatorElement()).toBeNull();
    expect(await dsfrHeaderHarness.getOperatorAnchorElement()).toBeNull();
    expect(await dsfrHeaderHarness.getAppNameElement()).toBeNull();

    expect(componentUnderTest.actions).toHaveLength(3);
    expect(await dsfrHeaderHarness.getHeaderActions()).toHaveLength(6);
  });
});
