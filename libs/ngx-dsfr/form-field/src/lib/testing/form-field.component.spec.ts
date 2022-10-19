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
  DsfrFormFieldComponent,
  EMPTY_LABEL_ERROR,
  EMPTY_LINK_ERROR,
  EMPTY_TITLE_ERROR,
} from '../form-field.component';
import { TestHostComponent } from './test-host.component';
import { DsfrLinkHarness } from './form-field.harness';


// describe('DsfrLinkComponent', () => {
//   let fixture: ComponentFixture<TestHostComponent>;
//   let testHost: TestHostComponent;
//   let componentUnderTest: DsfrLinkComponent;
//   let harnessLoader: HarnessLoader;
//   let dsfrLinkHarness: DsfrLinkHarness;

//   const testLabel: string = 'Test Label';
//   const testExternalLink: string = 'https://angular.io/guide/testing';
//   const testInternalLink: string = '/another/route';
//   const testTitle: string = 'Test Title';

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [
//         DsfrLinkComponent,
//         TestHostComponent,
//         RouterLinkDirectiveStub
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(TestHostComponent);
//     testHost = fixture.componentInstance;
//     componentUnderTest = fixture.debugElement.query(
//       By.directive(DsfrLinkComponent)
//     ).componentInstance;

//     /*
//      * We're retrieving a HarnessLoader HERE to be able to get
//      * the Test Harness for the DsfrLinkComponent LATER.
//      *
//      * We're NOT doing both HERE since getHarness() triggers
//      * indirectly the Change Detection mechanism and thus,
//      * Data Binding and ngOnInit()...
//      */
//     harnessLoader = TestbedHarnessEnvironment.loader(fixture);
//   });

//   it('should be created', () => {
//     expect(componentUnderTest).toBeTruthy();
//   });

//   it('should display the right template when backToTop is set to true', async () => {
//     testHost.testBackToTop = true;

//     /*
//      * We're retrieving the Test Harness HERE since we can now,
//      * without any problem, trigger the Change Detection mechanism
//      *
//      * WARNING: Triggers the Change Detection mechanism
//      */
//     dsfrLinkHarness = await harnessLoader.getHarness<DsfrLinkHarness>(
//       DsfrLinkHarness
//     );
//     expect(await dsfrLinkHarness.getAnchorText()).toBe('Haut de page');
//     expect(await dsfrLinkHarness.getAnchorAttribute('href')).toBe('#top');
//   });

//   describe(', when backToTop is not provided or is false, ', () => {
//     it('should throw an error when no label is provided', async () => {
//       try {
//         fixture.detectChanges();
//         throw 'It should have thrown an error about "label"';
//       } catch (error) {
//         expect(error).toBe(EMPTY_LABEL_ERROR);
//       }
//     });

//     it('should throw an error when no link is provided', () => {
//       try {
//         testHost.testLabel = testLabel;
//         fixture.detectChanges();
//         throw 'It should have thrown an error about "link"';
//       } catch (error) {
//         expect(error).toBe(EMPTY_LINK_ERROR);
//       }
//     });

//     it('should throw an error when no title is provided with an external link', () => {
//       try {
//         testHost.testLabel = testLabel;
//         testHost.testLink = testExternalLink;
//         fixture.detectChanges();
//         throw 'It should have thrown an error about "title"';
//       } catch (error) {
//         expect(error).toBe(EMPTY_TITLE_ERROR);
//       }
//     });

//     it('should display the right template when an external link is provided', async () => {
//       testHost.testLabel = testLabel;
//       testHost.testLink = testExternalLink;
//       testHost.testTitle = testTitle;

//       /*
//        * We're retrieving the Test Harness HERE since we can now,
//        * without any problem, trigger the Change Detection mechanism
//        *
//        * WARNING: Triggers the Change Detection mechanism
//        */
//       dsfrLinkHarness = await harnessLoader.getHarness<DsfrLinkHarness>(
//         DsfrLinkHarness
//       );
//       expect(await dsfrLinkHarness.getAnchorText()).toBe(testLabel);
//       expect(await dsfrLinkHarness.getAnchorAttribute('href')).toBe(
//         testExternalLink
//       );
//       expect(await dsfrLinkHarness.getAnchorAttribute('target')).toBe('_blank');
//       expect(await dsfrLinkHarness.getAnchorAttribute('rel')).toBe('noopener');
//       expect(await dsfrLinkHarness.getAnchorAttribute('title')).toBe(
//         testTitle + ' - ouvre une nouvelle fenêtre'
//       );
//     });

//     it('should display the right template when an internal link is provided', async () => {
//       testHost.testLabel = testLabel;
//       testHost.testLink = testInternalLink;

//       /*
//        * We're retrieving the Test Harness HERE since we can now,
//        * without any problem, trigger the Change Detection mechanism
//        *
//        * WARNING: Triggers the Change Detection mechanism
//        */
//       dsfrLinkHarness = await harnessLoader.getHarness<DsfrLinkHarness>(
//         DsfrLinkHarness
//       );

//       // Retrieving an instance of the RouterLinkDirectiveStub directive
//       const anchorWithRouterLink: DebugElement = fixture.debugElement.query(
//         By.directive(RouterLinkDirectiveStub)
//       );
//       const routerLinkStubInstance = anchorWithRouterLink.injector.get(
//         RouterLinkDirectiveStub
//       );

//       expect(await dsfrLinkHarness.getAnchorText()).toBe(testLabel);
//       expect(routerLinkStubInstance.linkParams).toBe(testInternalLink);
//     });

//     describe(' all required properties are provided, ', () => {
//       beforeEach(() => {
//         testHost.testLabel = testLabel;
//         testHost.testLink = testExternalLink;
//         testHost.testTitle = testTitle;
//         testHost.testIcon = 'ancient-gate-fill';
//         testHost.testIconAlignment = ElementAlignment.RIGHT;
//       });

//       describe(' and inline is set to true ( default ), ', () => {
//         beforeEach(async () => {
//           /*
//            * We're retrieving the Test Harness HERE since we can now,
//            * without any problem, trigger the Change Detection mechanism
//            *
//            * WARNING: Triggers the Change Detection mechanism
//            */
//           dsfrLinkHarness = await harnessLoader.getHarness<DsfrLinkHarness>(
//             DsfrLinkHarness
//           );
//         });

//         it('should have NO added classes', async () => {
//           expect(await dsfrLinkHarness.getAnchorAttribute('class')).toBe(null);
//         });
//       });

//       describe(' and inline is set to false, ', () => {
//         beforeEach(async () => {
//           testHost.testInline = false;

//           /*
//            * We're retrieving the Test Harness HERE since we can now,
//            * without any problem, trigger the Change Detection mechanism
//            *
//            * WARNING: Triggers the Change Detection mechanism
//            */
//           dsfrLinkHarness = await harnessLoader.getHarness<DsfrLinkHarness>(
//             DsfrLinkHarness
//           );
//         });

//         it('should have added classes', async () => {
//           const classes: string | null =
//             await dsfrLinkHarness.getAnchorAttribute('class');
//           expect(classes).toContain('fr-link');
//           expect(classes).toContain('fr-link--md');
//           expect(classes).toContain('fr-icon-ancient-gate-fill');
//           expect(classes).toContain('fr-link--icon-right');
//         });
//       });
//     });
//   });
// });
